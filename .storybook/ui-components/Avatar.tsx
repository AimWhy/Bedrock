import { Frame } from "@bedrock-layout/frame";

export const Avatar = (props) => (
  <Frame ratio={[1, 1]} style={{ height: 64, width: 64 }}>
    <img {...props} style={{ borderRadius: "50%" }} />
  </Frame>
);
