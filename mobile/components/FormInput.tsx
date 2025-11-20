import Input from "./UI/Input";

const FormInput = (props: {
  value: string;
  setValue: (field: string, text: string) => void;
  field: string;
  placeholder?: string;
}) => {
  return (
    <Input
      containerStyle={{
        borderRadius: 30,
      }}
      inputStyle={{
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={(text: string) => props.setValue(props.field, text)}
    />
  );
};

export default FormInput;
