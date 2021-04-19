package it.guiz.sensishare.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;
import it.guiz.sensishare.Api;
import it.guiz.sensishare.model.SensorDataModel;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SensorDataController {

    static final String BASE_URL = "https://api.sensishare.org/";

    public void start(Callback callback, String id) {
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        Api api = retrofit.create(Api.class);

        Call<List<SensorDataModel>> call = api.getSensorData(id);
        call.enqueue(callback);
    }
}