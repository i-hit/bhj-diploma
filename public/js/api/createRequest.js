/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let request = new XMLHttpRequest();
  let formData = new FormData();

  request.withCredentials = true;
  if (options.responseType) {
    request.responseType = options.responseType;
  }

  if (options.method === "GET") {
    options.url += "?";
    for (let item in options.data) {
      options.url += `${item}=${options.data[item]}&`;
    }
  } else {
    for (let item in options.data) {
      formData.append(item, options.data[item]);
    }
  }
  request.open(options.method, options.url);

  try {
    request.send(formData);
  } catch (err) {
    callback(err);
  }

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      if (!request.response.success) {
        options.callback(request.response.error, request.response);
      } else {
        options.callback(null, request.response);
      }
    }
  });

  return request;
};
