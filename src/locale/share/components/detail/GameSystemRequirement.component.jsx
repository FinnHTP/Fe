import React from "react";

const SystemRequirements = ({ requirements }) => {
  if (!requirements || requirements.length === 0) {
    return <p>No system requirements available.</p>;
  }

  const [minimumReq, recommendedReq] = requirements;

  return (
    <div className="system-requirements">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Minimum</th>
            <th className="border border-gray-300 p-2">Recommended</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-4">
              <ul>
                <li>
                  <span className="text-gray-400">OS Version:</span>
                  <br />
                  {minimumReq.os}
                </li>
                <li>
                  <span className="text-gray-400">Memory:</span>
                  <br />
                  {minimumReq.memory}
                </li>
                <li>
                  <span className="text-gray-400">Card:</span>
                  <br />
                  {minimumReq.card}
                </li>
                <li>
                  <span className="text-gray-400">Processor:</span>
                  <br />
                  {minimumReq.proccessor}
                </li>
                <li>
                  <span className="text-gray-400">Storage:</span>
                  <br />
                  {minimumReq.storage}
                </li>
              </ul>
            </td>
            <td className="border border-gray-300 p-4">
              <ul>
                <li>
                  <span className="text-gray-400">OS Version:</span>
                  <br />
                  {recommendedReq.os}
                </li>
                <li>
                  <span className="text-gray-400">Memory:</span>
                  <br />
                  {recommendedReq.memory}
                </li>
                <li>
                  <span className="text-gray-400">Card:</span>
                  <br />
                  {recommendedReq.card}
                </li>
                <li>
                  <span className="text-gray-400">Processor:</span>
                  <br />
                  {recommendedReq.proccessor}
                </li>
                <li>
                  <span className="text-gray-400">Storage:</span>
                  <br />
                  {recommendedReq.storage}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SystemRequirements;
