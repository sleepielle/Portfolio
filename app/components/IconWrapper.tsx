import React from "react";

interface IconWrapperProps {
  icon: React.ElementType;
  className?: string;
}

function IconWrapper({ icon: Icon, className }: IconWrapperProps) {
  return <Icon className={className} />;
}

export default IconWrapper;
