// Globals
import React from "react";

// Components
import { Record } from "components/Record";

// Misc
import { useItemData } from '../../services/APIContextProvider'
// Component
function GlobalRecords() {
  const { results: records, status } = useItemData();
  return (
    <div className="aura-page aura-global_records">
      <h1>Top Records of 2020</h1>

      <div className="aura-page-content">
        {status !== "ERROR" ? 
          records.map((record) => {
            return <Record key={record.id} data={record} />;
          }) :
          <div>{records}</div>
        }
      </div>
    </div>
  );
}

export { GlobalRecords };
