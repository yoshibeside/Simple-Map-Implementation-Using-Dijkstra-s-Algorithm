import { graph } from "../../../data/graph"

export default function handler(req, res) {
    res.status(200).json(graph)
}