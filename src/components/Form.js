import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addData } from '../redux/tableSlice';
import '../styles/Form.css';

const Form = ({ fields }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addData(data));
    reset();
  };

  const getValidationRules = (fieldName) => {
    // Determine validation rules based on field type
    const rules = { required: `${fieldName} is required` };
    
    if (fieldName.toLowerCase().includes('name')) {
      rules.pattern = {
        value: /^[A-Za-z\s]+$/,
        message: 'Name should only contain letters and spaces',
      };
    }

    // Add type-specific validations
    if (fieldName.toLowerCase().includes('email')) {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      };
    }

    return rules;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {fields.map((field) => (
        <div key={field} className="form-field">
              <label htmlFor={field}>{field === 'name' ? 'Name' : 'Email'}:</label>

          <input
            id={field}
            {...register(field, getValidationRules(field))}
            placeholder={`Enter ${field}`}
          />
          {errors[field] && <span className="error">{errors[field].message}</span>}
        </div>
      ))}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
