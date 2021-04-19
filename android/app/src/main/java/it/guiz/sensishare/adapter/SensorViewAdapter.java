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
import it.guiz.sensishare.model.SensorModel;


public class SensorViewAdapter extends RecyclerView.Adapter<SensorViewAdapter.ViewHolder> {

    private List<SensorModel> sensorDataSet;

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView tvName;
        private final ImageView ivSensorData;
        private final TextView tvPosition;
        private final TextView tvMaker;

        public ViewHolder(View view) {
            super(view);
            // Define click listener for the ViewHolder's View

            tvName = (TextView) view.findViewById(R.id.tvName);
            ivSensorData = (ImageView) view.findViewById(R.id.ivSensorData);
            tvPosition = (TextView) view.findViewById(R.id.tvPosition);
            tvMaker = (TextView) view.findViewById(R.id.tvMaker);
        }

        public TextView getTvMaker() {
            return tvMaker;
        }

        public TextView getTvName() {
            return tvName;
        }

        public ImageView getIvSensorData() {
            return ivSensorData;
        }

        public TextView getTvPosition() {
            return tvPosition;
        }
    }

    /**
     * Initialize the dataset of the Adapter.
     */
    public SensorViewAdapter(List<SensorModel> sensorDataSet) {
        this.sensorDataSet = sensorDataSet;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        // Create a new view, which defines the UI of the list item
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.item_sensor, viewGroup, false);

        return new ViewHolder(view);
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder viewHolder, final int position) {
        viewHolder.getTvName().setText(sensorDataSet.get(position).getName());
        viewHolder.getTvPosition().setText(sensorDataSet.get(position).getPosition());
        viewHolder.getTvMaker().setText(sensorDataSet.get(position).getMaker());

        viewHolder.getIvSensorData().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(v.getContext(), SensorDataActivity.class);
                i.putExtra("id", sensorDataSet.get(position).getId());
                v.getContext().startActivity(i);
            }
        });

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return sensorDataSet.size();
    }
}

