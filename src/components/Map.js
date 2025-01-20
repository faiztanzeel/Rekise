import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Draw } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import PopUpModal from "./PopUpModal";
import CoordinateModal from "./CoordinateModal";
import { useGeographic } from "ol/proj.js";
import { Button } from "@mui/material";

const MapComponent = () => {
  useGeographic();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawData, setDrawData] = useState([]);
  const [currentInteraction, setCurrentInteraction] = useState(null);

  console.log(drawData);

  useEffect(() => {
    if (mapRef.current && !map) {
      initializeMap();
    }
  }, [map]);

  const initializeMap = () => {
    const rasterLayer = new TileLayer({ source: new OSM() });
    const vectorSource = new VectorSource({ wrapX: false });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(mapInstance);
  };

  const startDrawing = () => setIsModalOpen(true);

  const handleGenerateData = () => {
    setIsModalOpen(false);
    if (map && !currentInteraction) {
      initializeDrawingInteraction("LineString");
    }
  };

  const initializeDrawingInteraction = (
    type,
    drawType = null,
    index = null,
    position = null
  ) => {
    const source = map.getLayers().getArray()[1].getSource();
    const draw = new Draw({ source, type });

    map.addInteraction(draw);
    setCurrentInteraction(draw);

    draw.on("drawend", (event) => {
      const coordinates =
        type === "LineString"
          ? event.feature.getGeometry().getCoordinates()
          : event.feature.getGeometry().getCoordinates()[0];

      setDrawData((prevData) => {
        const newData = drawType
          ? { type: drawType, coordinates }
          : coordinates;
        if (index !== null && position !== null) {
          const updatedData = [...prevData];
          if (position === "before") {
            updatedData.splice(index, 0, newData);
          } else {
            updatedData.splice(index + 1, 0, newData);
          }
          return updatedData;
        }
        return [...prevData, ...newData];
      });

      map.removeInteraction(draw);
      setCurrentInteraction(null);
    });

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          draw.finishDrawing(true);
          map.removeInteraction(draw);
          setCurrentInteraction(null);
        }
      },
      { once: true }
    );
  };

  const handlePolygonDrawing = (position, index) => {
    if (map && !currentInteraction) {
      initializeDrawingInteraction("Polygon", "polygon", index, position);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "11%" }}
        color="primary"
        onClick={startDrawing}
      >
        Draw LineString
      </Button>
      <div
        ref={mapRef}
        id="map"
        style={{ width: "100%", height: "100vh" }}
      ></div>
      <CoordinateModal
        drawData={drawData}
        handlePolygonDrawing={handlePolygonDrawing}
      />
      <PopUpModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleGenerateData={handleGenerateData}
      />
    </>
  );
};

export default MapComponent;
