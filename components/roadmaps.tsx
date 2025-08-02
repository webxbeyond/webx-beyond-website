import {
    ReactFlow,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
// -----------------------------------------

type RoadmapsProps = {
    nodes: Node[];
    edges: Edge[];
};
export default function Roadmaps({ nodes, edges }: RoadmapsProps) {
    return (
        <div className="flex flex-col items-center py-16 text-center z-[2] h-full w-full">
            <div style={{ width: "100%", height: "500px" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    minZoom={1}
                    maxZoom={1}
                    panOnDrag={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    nodesDraggable={false}
                    elementsSelectable={false}
                    connectOnClick={false}
                />
            </div>
        </div>
    );

}
