import { from } from "core-js/fn/array"
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3';

export default {
    TOP: () => axisTop(),
    LEFT: () => axisLeft(),
    BOTTOM: () => axisBottom(),
    RIGHT: () => axisRight()
}