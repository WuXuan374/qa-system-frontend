import React, { useEffect, useState } from 'react';
import { 
  apis, 
  triggerAPIRequest,
  HTTP_GET,
} from '../../api/apiConfig';

const ModelEvaluation = () => {
  const [data, setData] = useState([]);
  const getEvaluationResults = (model_name) => {
    triggerAPIRequest(`${apis.model.evaluation}/?model_name=${model_name}`, HTTP_GET)
      .then((data) => {
        const { results } = data
        setData(results)
      })
  }
  useEffect(() => {
    getEvaluationResults('BiDAF');
  }, []);

  return (
    <div>Hello Test!</div>
  );
};

export default ModelEvaluation;