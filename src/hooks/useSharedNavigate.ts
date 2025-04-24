import { useNavigate } from 'react-router-dom';

function useSharedNavigate() {
  return useNavigate(); 
};

export default useSharedNavigate;