///<reference path="../globals.ts" />

/* ------------
     pcb.ts

     Requires global.ts.


     ------------ */

module TSOS {

    export class MemoryManager {
        constructor(private mainMemory: Memory = new Memory()) {
          this.init();
        }

        public init(): void {

        }

        public loadProgram(prgm: string): boolean{
          //Clear current memory
          this.mainMemory.clear();
          //Insert into memory
          var currByte: string = ""; //Holds the current byte from program
          var memLoc: number = 0; //Current location in memory to insert byte into
          for(var i: number = 0; i < prgm.length; i++){
            currByte = currByte + prgm[i];
            if(currByte.length > 1){
              this.mainMemory.mainMem[memLoc].setHex(currByte);
              memLoc++;
              currByte = "";
            }
          }
          return true;
      }

      public getByteFromAddr(address: number): Byte {
        return this.mainMemory.mainMem[address];
      }

      public setByteAtAddr(byte: Byte, address: number): boolean {
        this.mainMemory.mainMem[address] = byte;
        return true;
      }

      public printMemory(): string {
        return this.mainMemory.toString();
      }
    }
}