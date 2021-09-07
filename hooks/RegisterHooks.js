import {useState} from 'react';
import {useUser} from './ApiHooks';

const useSignUpForm = (callback) => {
  const {checkUsernameAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  const checkUsername = async (username) => {
    // TODO: add check username functionality to Api hooks and use it
    // add error to input element if username is reserved
    const isAvailable = await checkUsernameAvailable(username);
    console.log('checkUsername available', isAvailable);
  };

  return {
    handleInputChange,
    inputs,
    checkUsername,
  };
};

export default useSignUpForm;
