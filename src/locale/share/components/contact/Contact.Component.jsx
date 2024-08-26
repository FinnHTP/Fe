import React, { useState } from 'react';
import MapComponent from '../../components/contact/Map.Component'; 

const ContactComponent = () => {
  const [location, setLocation] = useState({
    lat: 10.804602,
    lng: 106.718873,
  });

  return (
    <div className="container mx-auto p-5 h-[650px]">
      <div className="flex justify-center space-x-4">
        <div className="w-1/2 mt-[100px]">
          <MapComponent setLocation={setLocation} />
        </div>
        <div className="w-1/2">
          <section className=" rounded-lg shadow-lg h-full mt-[100px]">
            <div className="p-10 text-gray-200">
              <h4 className="text-white text-xl font-semibold mb-4">Contact us</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-sm">
                    Our business hours are 8:00 AM to 6:00 PM Monday-Friday and 9:00 AM to 5:00 AM on weekends.
                  </p>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex   text-sm text-gray-300">
                      <span className="font-medium">Address:</span>
                      <span className="">643 Xo Viet Nghe Tinh Ward 26 Binh Thanh District Ho Chi Minh City</span>
                    </li>
                    <li className="flex  text-sm text-gray-300">
                      <span className="font-medium">Phone:</span>
                      <span>+84 70 6757 167</span>
                    </li>
                    <li className="flex justify-between text-sm text-gray-300">
                      <span className="font-medium">Mail:</span>
                      <span>trinhphunghongphuc@gmail.com</span>
                    </li>
                    <img
                  src='https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png'
                  className="w-5 h-5"
                />
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4">
             
                <a href="#" className="text-blue-500"><i className="fa fa-facebook"></i></a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
