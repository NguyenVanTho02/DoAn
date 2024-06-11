
import { useController } from "react-hook-form";
import PropTypes from 'prop-types';

const Textarea = (props) => {
  const { control, name, placeholder = "", ...rest } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      className="w-full px-6 py-4 text-sm font-medium bg-transparent border rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white resize-none min-h-[140px] outline-none"
      placeholder={placeholder}
      {...field}
      {...rest}
    ></textarea>
  );
};
Textarea.propTypes={
    control:PropTypes.any.isRequired,
    name:PropTypes.string,
    placeholder:PropTypes.string,
   
}
export default Textarea;