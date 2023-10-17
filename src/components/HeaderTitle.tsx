import React from "react";

type PropsType = {
  title: string;
  subtitle: string;
};

export default function HeaderTitle({ title, subtitle }: PropsType) {
  return (
    <>
      <h1
        style={{
          color: "#333333",
          textAlign: "center",
          margin: "50px 0",
          fontSize: "40px",
        }}
      >
        {title}
      </h1>
      <h2 style={{ color: "gray", textAlign: "center", margin: "50px 0" }}>
        {subtitle}
      </h2>
    </>
  );
}
