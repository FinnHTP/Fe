import { Button, Layout, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function BackUpUI() {
  return (
    <Layout className="min-h-screen bg-white font-serif">
      <Content className="p-8 text-center">
        <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-center h-96 flex items-center justify-center">
          <Title
            level={1}
            className="text-gray-800"
            style={{ fontSize: "6rem" }}
          >
            404
          </Title>
        </div>
        <div className="text-center mt-[50px]">
          <Title level={3} className=" text-gray-800">
            Something wrong with the server!!!
          </Title>
          <Paragraph className="text-base text-black-800 mt-4">
            We are currently performing maintenance. Please check back later.
          </Paragraph>
          <Paragraph className="mt-4 text-base text-gray-600">
            Please contact us via email:{" "}
            <a href="mailto:Support@BAP.jp" className="text-blue-500 underline">
              nguyentrongkhoa104@gmail.com
            </a>
          </Paragraph>
          <Link to="/">
            <Button className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
              Back to Home page!
            </Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}

export default BackUpUI;
