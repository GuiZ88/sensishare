package it.guiz.sensishare;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import it.guiz.sensishare.adapter.SensorDataAdapter;
import it.guiz.sensishare.adapter.SensorViewAdapter;
import it.guiz.sensishare.controller.SensorController;
import it.guiz.sensishare.controller.SensorDataController;
import it.guiz.sensishare.model.SensorDataModel;
import it.guiz.sensishare.model.SensorModel;
import retrofit2.Call;
import retrofit2.Response;

import static android.widget.LinearLayout.VERTICAL;

public class SensorDataActivity extends AppCompatActivity {

    SensorDataAdapter sensorDataAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sensor_data);

        String id = "";
        if(getIntent().getExtras() != null) {
            id = getIntent().getStringExtra("id");
        }

        /*
        *
        * GET LIST OF SENSORS DATA
        * */
        retrofit2.Callback<List<SensorDataModel>> callbackSensor = new retrofit2.Callback<List<SensorDataModel>>() {
            @Override
            public void onResponse(Call<List<SensorDataModel>> call, Response<List<SensorDataModel>> response) {
                if(response.isSuccessful()) {
                    List<SensorDataModel> sensorList = response.body();

                    RecyclerView recyclerView = findViewById(R.id.sensorDataRecyclerView);
                    recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));

                    DividerItemDecoration itemDecor = new DividerItemDecoration(recyclerView.getContext(), VERTICAL);
                    recyclerView.addItemDecoration(itemDecor);

                    sensorDataAdapter = new SensorDataAdapter(sensorList);
                    recyclerView.setAdapter(sensorDataAdapter);



                    System.out.println(sensorList);
                } else {
                    System.out.println(response.errorBody());
                }
            }

            @Override
            public void onFailure(Call<List<SensorDataModel>> call, Throwable t) {
                t.printStackTrace();
            }
        };

        SensorDataController sensorDataController = new SensorDataController();
        sensorDataController.start(callbackSensor, id);
    }
}