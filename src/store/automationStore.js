// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// const useAutomationStore = create(
//   persist(
//     (set) => (
//       {
//         nodes: [
//           { id: "1", position: { x: 5, y: 5 }, data: { label: "1" } },
//           { id: "2", position: { x: 5, y: 100 }, data: { label: "2" } },
//         ],
//         edges: [{ id: "e1-2", source: "1", target: "2" }],
//         addFlow: () =>
//           set((state) => {
//             const newNodeId = (state.nodes.length + 1).toString();
//             const newNode = {
//               id: newNodeId,
//               position: { x: 5, y: 100 * state.nodes.length },
//               data: { label: newNodeId },
//             };
//             const newEdge = {
//               id: `e${state.nodes.length}-${newNodeId}`,
//               source: state.nodes.length.toString(),
//               target: newNodeId,
//             };
//             return {
//               nodes: [...state.nodes, newNode],
//               edges: [...state.edges, newEdge],
//             };
//           }),
//       },
//       {
//         name: "automation-storage", // name of the item in the storage (must be unique)
//         storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
//       }
//     ),
//   ),
// );

// export default useAutomationStore;
