import React, { useState } from 'react';

function App() {
  const [inputData, setInputData] = useState('');
  const [transformationData, setTransformationData] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleTransformationChange = (event) => {
    setTransformationData(event.target.value);
  };

  const handleGenerateOutput = () => {
    try {
      // Perform Jolt transformation on the input data
      applyTransformation(inputData, transformationData).then(
        (transformedData) => setOutputData(transformedData)
      );

      // Update the state with the transformed output data
    } catch (error) {
      // Handle any error that occurred during the transformation
      console.error('Error applying transformation:', error);
    }
  };

  const freemarker = require('freemarker');

  // Function to perform FreeMarker transformation
  function applyTransformation(inputData, transformationData) {
    return new Promise((resolve, reject) => {
      // Create a FreeMarker engine instance
      const fm = new freemarker();

      // Configure the FreeMarker engine
      fm.configure({});

      // Compile the transformation template
      const template = fm.compile(transformationData);

      // Create the data model object
      const dataModel = {
        body: inputData,
      };

      // Execute the transformation
      template.process(dataModel, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  module.exports = applyTransformation;

  return (
    <div>
      <h1>iHub Transformation</h1>
      <div>
        <h2>Input Data</h2>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          rows={10}
          cols={50}
          placeholder="Enter JSON data model..."
        />
      </div>
      <div>
        <h2>Transformation Data</h2>
        <textarea
          value={transformationData}
          onChange={handleTransformationChange}
          rows={10}
          cols={50}
          placeholder="Enter FreeMarker transformation spec..."
        />
      </div>
      <div>
        <button onClick={handleGenerateOutput}>Generate Output</button>
      </div>
      {outputData && (
        <div>
          <h2>Output Data</h2>
          <textarea value={outputData} rows={10} cols={50} readOnly />
        </div>
      )}
    </div>
  );
}

export default App;
