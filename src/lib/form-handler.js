var getOptions = require("./get-options");
var qs = require("querystring");
var GraphQLClient = require("graphql-request").GraphQLClient;

var graphQlClient = new GraphQLClient(
  "https://api-euwest.graphcms.com/v1/cjsajd6d3ciq801gjs9v7ff7j/master",
  {
    headers: {
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiZjczZTc1NGUtYjA1OC00ZmYxLTkzNTctYThiMWNlMGFhMTQ5In0.cP4R3xwFgnVwZHhqqYA1s3UqAiXEsndBFEo-FyaTsPE"
    }
  }
);

function request(doc, callback) {
  if (typeof callback !== "function") {
    callback = function() {};
  }

  var options = getOptions();
  var query;

  switch (doc.type) {
    case "email":
      query = `
        mutation {
          createRequest (data: {
            type: RT_EMAIL
            phone: "${doc.phone}"
            email: "${doc.email}"
            text: "${doc.text}"
            isNew: true
            site: {
              connect: {
                id: "${options.chatId}"
              }
            }
          }) {
            id
          }
        }
      `;
      break;
    case "phone":
      query = `
        mutation {
          createRequest (data: {
            type: RT_PHONE
            phone: "${doc.phone}"
            date: ${doc.date}
            time: ${doc.time}
            isNew: true
            site: {
              connect: {
                id: "${options.chatId}"
              }
            }
          }) {
            id
          }
        }
      `;
      break;
  }

  graphQlClient
    .request(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
  // var options = getOptions();
  // doc.t = new Date().getTime();
  // doc.ckey = options.ckey;
  // var endpoint = `${options.endpoint}/sc_${options.ckey}`;
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", endpoint);
  // xhr.setRequestHeader("Accept", "application/json");
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.onreadystatechange = function() {
  //   switch (xhr.readyState) {
  //     case XMLHttpRequest.DONE:
  //       var responseObject = JSON.parse(xhr.responseText);
  //       if (responseObject.ok === true) {
  //         callback(null, responseObject);
  //       } else {
  //         callback(responseObject);
  //       }
  //       break;
  //   }
  // };
  // xhr.send(JSON.stringify(doc));
  // debugger;
}

exports.phone = function(data) {
  var phone = data.phoneNumber;
  var date = parseInt(data.date, 10);
  var time = parseInt(data.date, 10);
  if (isNaN(date)) date = data.date;
  if (isNaN(time)) time = data.time;

  return request({
    phone,
    date,
    time,
    type: "phone"
  });
};

exports.mail = function(data) {
  var phone = data.phoneNumber2;
  var email = data.emailAddres;
  var text = data.emailMessage;

  return request({
    phone,
    email,
    text,
    type: "email"
  });
};
