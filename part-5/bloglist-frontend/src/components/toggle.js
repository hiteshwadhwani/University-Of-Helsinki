import React, { useState , useImperativeHandle  } from "react";
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisiblity = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisiblity };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonTitle}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </>
  );
});
Togglable.PropTypes = {
  buttonTitle: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable';
export default Togglable;
