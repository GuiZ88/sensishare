
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

// CONSTANT
#define POWERSUPPLY 3.3

// MF52 CONSTANT
#define SERIESRESISTOR 10000
#define BCOEFFICIENT 3435
#define THERMISTORNOMINAL 10000
#define TEMPERATURENOMINAL 25

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

  // NTC MF52-103
  // set analog resolution up to 12bits
  analogReadResolution(12);
  int vrt = analogRead(A0); // read analog value

  /* quantization
    12 binary digits (analogResolution) , or 3 nibbles
    (a 'tribble'), have 4096 (10000 octal,
    1000 hexadecimal) distinct combinations
    -1 we keep also 0   */
  int quantization = 4096 - 1;

  // steinhartRead
  double temperature = steinhartRead(vrt,  BCOEFFICIENT,
                                     THERMISTORNOMINAL, SERIESRESISTOR,
                                     quantization, POWERSUPPLY,
                                     TEMPERATURENOMINAL);
  Serial.println(temperature);
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" *C");

  // json
  String json = "";
  DynamicJsonDocument docSer(1024);
  docSer["celsius"] = roundf(temperature * 100.0) / 100.0;
  serializeJson(docSer, json);
  Serial.println(json);


  // POST
  apiPost(json, "application/json", "/sensor/data/SENSOR_ID/", true);

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
  // get last insert record by set page=0 and limit=1
  apiGET("/sensor/data/SENSOR_ID/?page=0&limit=1");
  /*
    You can also use the "get data by id" call if you know the identifier of the data
    http://api.sensishare.org/sensor/data/SENSOR_ID/ID
  */

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
  const double celsius = docDes[0]["celsius"];
  const char* date = docDes[0]["date"];
  const char* id = docDes[0]["id"];
  Serial.println(celsius);
  Serial.println(date);
  Serial.println(id);

  delay(10000);
}



/*
  POST sensishare API
  @json: data
  @contentType: content type of request
  @endPoint: end point of the request
  @isSecret: use secret key
*/
void apiPost(String json, String contentType, String endPoint, boolean isSecret) {
  client.beginRequest();
  client.post(endPoint);
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
  double steinhartRead()
  read temperature of thermistore and converts in celsius
  @analog_read: value of analog read
  @b_coefficient: b coefficient of thermistore
  @t_n_resistance: therminal nominal resistance
  @series_resistance: value of series resistance
  @quantization: quantization of the analog reading
  @power_supply_voltage: power supply voltage
  @nominal_temperature: nominal temperature of the thermistor
*/
double steinhartRead(int analog_read, int b_coefficient, int t_n_resistance, int series_resistance, int quantization, double power_supply_voltage, int nominal_temperature)
{
  double V = (power_supply_voltage / quantization) * analog_read;
  double R = ((series_resistance * power_supply_voltage) / V) - series_resistance;
  double T = b_coefficient / log(R / (t_n_resistance * pow(M_E, (-b_coefficient / (273.15 + nominal_temperature) ))));
  return T - 273.15;
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
