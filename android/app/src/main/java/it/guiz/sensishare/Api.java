package it.guiz.sensishare;

import java.util.List;

import it.guiz.sensishare.model.SensorDataModel;
import it.guiz.sensishare.model.SensorModel;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface Api {
    @GET("sensor/data/{id}/")
    Call<List<SensorDataModel>> getSensorData(@Path("id") String id);

    @GET("sensors/")
    Call<List<SensorModel>> getSensors();
}