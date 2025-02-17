export interface ResourceFormValues {
    name: string;
    description: string;
    active?: boolean;
  }
  
  export interface ValidationErrors {
    [key: string]: string;
  }
  
  export const validateResourceForm = (values: ResourceFormValues): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    if (!values.name.trim()) {
      errors.name = 'O nome é obrigatório.';
    }
  
    if (!values.description.trim()) {
      errors.description = 'A descrição é obrigatória.';
    }
  
    return errors;
  };
  