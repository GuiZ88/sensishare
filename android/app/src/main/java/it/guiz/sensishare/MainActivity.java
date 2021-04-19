package it.guiz.sensishare;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.View;

import java.util.List;

import it.guiz.sensishare.adapter.SensorViewAdapter;
import it.guiz.sensishare.controller.SensorController;
import it.guiz.sensishare.model.SensorModel;
import retrofit2.Call;
import retrofit2.Response;

import static android.widget.LinearLayout.HORIZONTAL;
import static android.widget.LinearLayout.VERTICAL;

public class MainActivity extends AppCompatActivity {

    SensorViewAdapter sensorViewAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*
        *
        * GET LIST OF SENSORS AVAIBLE
        * */
        retrofit2.Callback<List<SensorModel>> callbackSensor = new retrofit2.Callback<List<SensorModel>>() {
            @Override
            public void onResponse(Call<List<SensorModel>> call, Response<List<SensorModel>> response) {
                if(response.isSuccessful()) {
                    List<SensorModel> sensorList = response.body();

                    RecyclerView recyclerView = findViewById(R.id.sensorRecyclerView);
                    recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));

                    DividerItemDecoration itemDecor = new DividerItemDecoration(recyclerView.getContext(), VERTICAL);
                    recyclerView.addItemDecoration(itemDecor);

                    sensorViewAdapter = new SensorViewAdapter(sensorList);
                    recyclerView.setAdapter(sensorViewAdapter);



                    System.out.println(sensorList);
                } else {
                    System.out.println(response.errorBody());
                }
            }

            @Override
            public void onFailure(Call<List<SensorModel>> call, Throwable t) {
                t.printStackTrace();
            }
        };

        SensorController sensorController = new SensorController();
        sensorController.start(callbackSensor);
    }
}