var TSOS;
(function (TSOS) {
    var Pcb = (function () {
        function Pcb(processState, processID, programCounter, accumulator, x, y, z) {
            if (processState === void 0) { processState = 0; }
            if (processID === void 0) { processID = 0; }
            if (programCounter === void 0) { programCounter = 0; }
            if (accumulator === void 0) { accumulator = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.processState = processState;
            this.processID = processID;
            this.programCounter = programCounter;
            this.accumulator = accumulator;
            this.x = x;
            this.y = y;
            this.z = z;
            this.init();
        }
        Pcb.prototype.init = function () {
            this.processID = Pcb.currentProcessNum;
            Pcb.currentProcessNum++;
        };
        Pcb.currentProcessNum = 0;
        return Pcb;
    })();
    TSOS.Pcb = Pcb;
})(TSOS || (TSOS = {}));
