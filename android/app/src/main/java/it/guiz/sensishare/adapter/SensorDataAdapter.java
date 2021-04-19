package it.guiz.sensishare.adapter;


import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import it.guiz.sensishare.R;
import it.guiz.sensishare.SensorDataActivity;
import it.guiz.sensishare.model.SensorDataModel;
import it.guiz.sensishare.model.SensorModel;


public class SensorDataAdapter extends RecyclerView.Adapter<SensorDataAdapter.ViewHolder> {

    private List<SensorDataModel> sensorDataDataSet;

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvId;
        private final TextView tvDate;
        private final TextView tvCelsius;

        public ViewHolder(View view) {
            super(view);

            tvId = (TextView) view.findViewById(R.id.tvId);
            tvDate = (TextView) view.findViewById(R.id.tvDate);
            tvCelsius = (TextView) view.findViewById(R.id.tvCelsius);
        }

        public TextView getTvId() {
            return tvId;
        }

        public TextView getTvDate() {
            return tvDate;
        }

        public TextView getTvCelsius() {
            return tvCelsius;
        }
    }

    /**
     * Initialize the dataset of the Adapter.
     */
    public SensorDataAdapter(List<SensorDataModel> sensorDataSet) {
        this.sensorDataDataSet = sensorDataSet;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        // Create a new view, which defines the UI of the list item
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.item_sensor_data, viewGroup, false);

        return new ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        viewHolder.getTvId().setText(sensorDataDataSet.get(position).getId());
        viewHolder.getTvDate().setText(sensorDataDataSet.get(position).getDate().toString());
        viewHolder.getTvCelsius().setText(sensorDataDataSet.get(position).getCelsius());
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return sensorDataDataSet.size();
    }
}

