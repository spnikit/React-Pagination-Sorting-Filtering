import React from "react";

const HeartIcon = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default HeartIcon;

//<i class="fa fa-heart-o" aria-hidden="true"></i>
//<i class="fa fa-heart" aria-hidden="true"></i>
