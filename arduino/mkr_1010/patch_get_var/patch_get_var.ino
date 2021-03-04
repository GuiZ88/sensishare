
// include
#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>

/*
Replace with yours data the following string
  _SSID_
  _WIFI_PASSWORD_
  _SECRETKEY_
  SENSOR_ID
*/

// Network SSID
const char* ssid = "_SSID_";
const char* password = "_WIFI_PASSWORD_";

//SENSISHARE
#define SECRETKEY "_SECRETKEY_"
const char ENDPOINT[] = "api.sensishare.org";  // server name
const int ENDPOINTPORT = 443; //80;

// Wifi & HttpClient
//WiFiClient wifi; // Non SSL
WiFiSSLClient wifi; // SSL
HttpClient client = HttpClient(wifi, ENDPOINT, ENDPOINTPORT);
int status;

void setup() {
  // serial communication
  Serial.begin(9600);
  while (!Serial);

  // WiFi connection
  checkWifi();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("You're connected to the network");
    Serial.println("----------------------------------------");
  }
}

void loop() {
  // check WiFi connection
  checkWifi();

  // json
  String json = "";
  DynamicJsonDocument docSer(1024);
  docSer["key"] = "state";
  docSer["value"] = "on";
  serializeJson(docSer, json);
  Serial.println(json);

  // PATCH
  apiPatch(json, "application/json", "/sensor/var/SENSOR_ID/", true);

  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  switch (statusCode) {
    case 201:
      Serial.println("[" + String(statusCode) + "] Created / data has been entered");
      break;
    case 400:
      Serial.println("[" + String(statusCode) + "] Bad Request");
      break;
    case 401:
      Serial.println("[" + String(statusCode) + "] Unauthorized / check Secret-Key");
      break;
    case 500:
      Serial.println("[" + String(statusCode) + "] Internal server error / something goes wrong");
      break;
  }
  Serial.print("Response: ");
  Serial.println(response);

  // GET
  // get var by key = state
  apiGET("/sensor/var/SENSOR_ID/state");

  // read the status code and body of the response
  statusCode = client.responseStatusCode();
  response = client.responseBody();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  switch (statusCode) {
    case 200:
      Serial.println("[" + String(statusCode) + "] OK");
      break;
    case 400:
      Serial.println("[" + String(statusCode) + "] Bad Request");
      break;
    case 500:
      Serial.println("[" + String(statusCode) + "] Internal server error / something goes wrong");
      break;
  }
  Serial.print("Response: ");
  Serial.println(response);

  // deserialization
  DynamicJsonDocument docDes(1024);
  deserializeJson(docDes, response);
  const char* key = docDes["key"];
  const char* value = docDes["value"];
  const char* id = docDes["id"];
  Serial.println(key);
  Serial.println(value);
  Serial.println(id);

  delay(10000);
}



/*
  PATCH sensishare API
  @json: data
  @contentType: content type of request
  @endPoint: end point of the request
  @isSecret: use secret key
*/
void apiPatch(String json, String contentType, String endPoint, boolean isSecret) {
  client.beginRequest();
  client.patch(endPoint);
  client.sendHeader(HTTP_HEADER_CONTENT_TYPE, contentType);
  client.sendHeader(HTTP_HEADER_CONTENT_LENGTH, json.length());
  if (isSecret)
    client.sendHeader("Secret-Key", SECRETKEY);
  client.beginBody();
  client.print(json);
  client.endRequest();
}

/*
  GET sensishare API
  @endPoint: end point of the request
*/
void apiGET(String endPoint) {
  client.get(endPoint);
}

/*
  check & connect to WiFi
*/
void checkWifi() {
  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to network: ");
    
    Serial.println(ssid);

    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, password);

    // wait 10 seconds for connection:
    delay(10000);
  }
}
