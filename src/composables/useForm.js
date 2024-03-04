import Schema from "async-validator";
import {ref} from 'vue';


export function useForm(options) {

  const formErrors = ref({});
  const form = ref(options.form);
  const validator = new Schema(options.descriptor);

  const validateForm = async () => {

    validator.validate(form.value, (errors, fields) => {
      if (errors) {
        errors.forEach((error) => {
          formErrors.value[error.field] = error.message
        })
        return;
      }
      console.log('submitted !');
    
    })
  }

  return [form, formErrors, validateForm];
};
