var beamWeapons = [];
var weaponIndex = 0;
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            beamWeapons = ["Power Beam", "Wave Beam", "Ice Beam", "Plasma Beam"];
            weaponIndex = 0;
            var sc;
            sc = new TSOS.ShellCommand(this.shellTest, "test", "- A command for testing purposes only.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays your current location.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<status> - Sets your current status.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "<priority> - Loads a program from the program input.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<PID> - Runs process of given Process ID number <PID>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "- Runs all loaded processes.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<integer> - Sets the time quantum for round robin scheduling.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellSetSchedule, "setschedule", "<rr | fcfs | priority> - Sets the scheduling algorithm to be used (default: rr).");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellGetSchedule, "getschedule", "- Returns the name of the scheduling algorithm currently in use.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellPs, "ps", "- Displays all running processes.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<PID> - Terminates a process by its process ID <PID>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "- Clears all partitions of memory.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellCreate, "create", "<filename> - Create a file with the given <filename>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRead, "read", "<filename> - Display the contents of a file with the given <filename>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellWrite, "write", "<filename> \"data\" - Write the data in double quotes to the file <filename>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellDelete, "delete", "<filename> - Remove <filename> from storage.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellFormat, "format", "- Clears and initializes all data in the hard drive.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellLS, "ls", "- Lists the files that are currently in the file system.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellChangeWeapon, "changeweapon", "- Switches to next beam weapon.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellShoot, "shoot", "- Fires selected beam weapon.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", "- Displays a blue screen of death.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            var userCommand = this.parseInput(buffer);
            var cmd = userCommand.command;
            var args = userCommand.args;
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        Shell.prototype.execute = function (fn, args) {
            _StdOut.advanceLine();
            fn(args);
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            this.putPrompt();
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            buffer = TSOS.Utils.trim(buffer);
            buffer = buffer.toLowerCase();
            var tempList = buffer.split(" ");
            var cmd = tempList.shift();
            cmd = TSOS.Utils.trim(cmd);
            retVal.command = cmd;
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellTest = function (args) {
        };
        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        };
        Shell.prototype.shellDate = function (args) {
            var currentDate = new Date();
            _StdOut.putText("Date: " + currentDate.toLocaleDateString() + " Time: " + currentDate.toLocaleTimeString());
        };
        Shell.prototype.shellWhereAmI = function (args) {
            _StdOut.putText("Chillin' in Phendrana Drifts.");
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };
        Shell.prototype.shellStatus = function (args) {
            if (args.length > 0) {
                var st = "" + args[0];
                if (args.length > 1) {
                    for (var i = 1; i < args.length; i++) {
                        st = st + " " + args[i];
                    }
                }
                _Status = st;
                TSOS.Control.timeStatusUpdate();
            }
        };
        Shell.prototype.shellLoad = function (args) {
            var priority = 6;
            var priorityErr = false;
            if (args.length > 0) {
                priority = parseInt(args[0]);
                if (priority < 0 || priority > 100) {
                    _StdOut.putText("Error: Priority must be between 0 and 100 inclusive.");
                    priorityErr = true;
                }
            }
            if (!priorityErr) {
                var prgm = document.getElementById("taProgramInput").value;
                if (prgm.length > 0) {
                    var pattern = /([^0123456789abcdefABCDEF\s])/g;
                    var result = prgm.search(pattern);
                    if (result >= 0) {
                        _StdOut.putText("Error: Programs can only contain hex digits and spaces.");
                    }
                    else {
                        prgm = TSOS.Utils.removeSpaces(prgm);
                        if (prgm.length > 512) {
                            _StdOut.putText("Program cannot be more than 256 bytes long.");
                        }
                        else {
                            var partition = _MemoryManager.getNextFreePartition();
                            if (partition === -1 && (!_HardDrive.supported || !_krnHardDriveDriver.formatted)) {
                                if (!_krnHardDriveDriver.formatted) {
                                    _StdOut.putText("Error: Format hard drive to load more programs.");
                                }
                                else {
                                    _StdOut.putText("Error: No memory partitions available.");
                                }
                            }
                            else {
                                var loc = _MemoryManager.loadProgram(prgm, partition);
                                var pcb = new TSOS.Pcb();
                                pcb.setPartition(partition, loc);
                                pcb.setPriority(priority);
                                _ResidentList.add(pcb);
                                _StdOut.putText("Program loaded. PID: " + pcb.processID);
                            }
                        }
                    }
                }
                else {
                    _StdOut.putText("Error: Please type in a program.");
                }
            }
        };
        Shell.prototype.shellRun = function (args) {
            if (args.length > 0) {
                if (args[0].match(/[0-9]+/g)) {
                    var pcb = _ResidentList.getPcb(parseInt(args[0]));
                    if (pcb !== null && pcb !== undefined) {
                        _ReadyQueue.enqueue(pcb);
                        _CpuScheduler.init();
                        _CPU.isExecuting = true;
                    }
                    else {
                        _StdOut.putText("Error: PID " + args[0] + " does not exist currently.");
                    }
                }
                else {
                    _StdOut.putText("Error: Please enter a numeric PID.");
                }
            }
            else {
                _StdOut.putText("Error: Please enter a PID.");
            }
        };
        Shell.prototype.shellRunAll = function (args) {
            if (_ResidentList.isEmpty()) {
                _StdOut.putText("Error: No programs loaded.");
            }
            else {
                _ResidentList.fillReadyQueue();
                _CpuScheduler.init();
                _CPU.isExecuting = true;
            }
        };
        Shell.prototype.shellQuantum = function (args) {
            if (_SchedMode === RR) {
                if (args.length > 0) {
                    if (args[0].match(/[0-9]+/g)) {
                        var quant = parseInt(args[0]);
                        if (quant < 0) {
                            _StdOut.putText("Error: You can't have negative time.");
                        }
                        else {
                            _TimeQuantum = quant;
                            _StdOut.putText("Time quantum is now " + quant + ".");
                        }
                    }
                    else {
                        _StdOut.putText("Error: Please enter a positive numeric quantum.");
                    }
                }
                else {
                    _StdOut.putText("Error: Please enter a positive number.");
                }
            }
            else {
                _StdOut.putText("Error: You must first set Round Robin scheduling.");
            }
        };
        Shell.prototype.shellSetSchedule = function (args) {
            if (args.length < 1) {
                _StdOut.putText("Error: You must enter a scheduling algorithm: [rr, fcfs, priority].");
            }
            else {
                switch (args[0].toLowerCase()) {
                    case "rr":
                        _SchedMode = RR;
                        _TimeQuantum = 6;
                        _StdOut.putText("Scheduling set to Round Robin with quantum of 6.");
                        break;
                    case "fcfs":
                        _SchedMode = FCFS;
                        _TimeQuantum = 900000000;
                        _StdOut.putText("Scheduling set to First Come, First Serve.");
                        break;
                    case "priority":
                        _SchedMode = PRTY;
                        _StdOut.putText("Scheduling set to Priority.");
                        break;
                    default:
                        _StdOut.putText("Please enter a valid scheduling algorithm: [rr, fcfs, priority]");
                }
            }
        };
        Shell.prototype.shellGetSchedule = function (args) {
            switch (_SchedMode) {
                case RR:
                    _StdOut.putText("Scheduling mode is Round Robin.");
                    break;
                case FCFS:
                    _StdOut.putText("Scheduling mode is First Come, First Serve.");
                    break;
                case PRTY:
                    _StdOut.putText("Scheduling mode is Priority.");
                    break;
            }
        };
        Shell.prototype.shellPs = function (args) {
            if (_CurrentPCB !== null) {
                _StdOut.putText("PID " + _CurrentPCB.processID + " is currently running. ");
            }
            var str = "PID ";
            if (!_ReadyQueue.isEmpty()) {
                for (var i = 0; i < _ReadyQueue.getSize(); i++) {
                    if (i < _ReadyQueue.getSize() - 1) {
                        if (_ReadyQueue.peek(i).processState != TERMINATED) {
                            str += _ReadyQueue.peek(i).processID + ", ";
                        }
                    }
                    else {
                        if (_ReadyQueue.peek(i).processState != TERMINATED) {
                            if (i > 0) {
                                str += "and " + _ReadyQueue.peek(i).processID + " are waiting.";
                            }
                            else {
                                str += _ReadyQueue.peek(i).processID + " is waiting.";
                            }
                        }
                    }
                }
                _StdOut.putText(str);
            }
        };
        Shell.prototype.shellKill = function (args) {
            if (args.length > 0) {
                if (args[0].match(/[0-9]+/g)) {
                    var id = parseInt(args[0]);
                    var killed = false;
                    if (_CurrentPCB.processID === id) {
                        _CurrentPCB.processState = TERMINATED;
                        _MemoryManager.setPartition(_CurrentPCB.partition, false);
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXT_IRQ, "I don't know what to put here yet."));
                        killed = true;
                    }
                    else if (!_ReadyQueue.isEmpty()) {
                        for (var i = 0; i < _ReadyQueue.getSize(); i++) {
                            if (_ReadyQueue.peek(i).processID === id) {
                                _ReadyQueue.peek(i).processState = TERMINATED;
                                _MemoryManager.setPartition(_ReadyQueue.peek(i).partition, false);
                                killed = true;
                            }
                        }
                    }
                    if (killed) {
                        _StdOut.putText("PID " + args[0] + " was killed.");
                    }
                    else {
                        _StdOut.putText("Error: PID " + args[0] + " is not currently running.");
                    }
                }
                else {
                    _StdOut.putText("Error: Please enter a numeric PID.");
                }
            }
            else {
                _StdOut.putText("Error: Please enter a PID.");
            }
        };
        Shell.prototype.shellClearMem = function (args) {
            _MemoryManager.clearAllMem();
            _ResidentList.removeAll();
        };
        Shell.prototype.shellCreate = function (args) {
            if (_krnHardDriveDriver.formatted) {
                if (args.length > 0) {
                    var name = args[0];
                    if (name.length <= 60) {
                        if (_krnHardDriveDriver.createFile(name)) {
                            _StdOut.putText("Created file \"" + name + "\".");
                        }
                        else {
                            _StdOut.putText("Failed to create file \"" + name + "\". Check log for details.");
                        }
                    }
                    else {
                        _StdOut.putText("Error: Name must be 60 characters or less.");
                    }
                }
                else {
                    _StdOut.putText("Error: Please enter a name for the file.");
                }
            }
            else {
                _StdOut.putText("Error: Hard Drive must be formatted before use.");
            }
        };
        Shell.prototype.shellRead = function (args) {
            if (_krnHardDriveDriver.formatted) {
                if (args.length === 1) {
                    var name = args[0];
                    _StdOut.putText(_krnHardDriveDriver.readFromFile(name));
                }
                else {
                    _StdOut.putText("Error: You must enter a single file name.");
                }
            }
            else {
                _StdOut.putText("Error: Hard Drive must be formatted before use.");
            }
        };
        Shell.prototype.shellWrite = function (args) {
            if (_krnHardDriveDriver.formatted) {
                if (args.length < 2) {
                    _StdOut.putText("Error: The proper syntax is: write filename \"data\"");
                }
                else {
                    var name = args[0];
                    var data = "";
                    for (var i = 1; i < args.length; i++) {
                        if ((i + 1) <= args.length) {
                            data += " ";
                        }
                        data += args[i];
                    }
                    if (("" + data.charAt(1)).localeCompare("\"") === 0 && ("" + data.charAt(data.length - 1)).localeCompare("\"") === 0) {
                        data = data.substring(2, data.length - 1);
                        console.log("data: " + data);
                        _krnHardDriveDriver.writeToFile(name, data);
                        _StdOut.putText("Wrote data to file \"" + name + "\".");
                    }
                    else {
                        console.log(data + data.charAt(1) + data.charAt(data.length - 1));
                        _StdOut.putText("Error: The data to be written must be within double quotes.");
                    }
                }
            }
            else {
                _StdOut.putText("Error: Hard Drive must be formatted before use.");
            }
        };
        Shell.prototype.shellDelete = function (args) {
            if (_krnHardDriveDriver.formatted) {
                if (args.length === 1) {
                    var name = args[0];
                    _StdOut.putText(_krnHardDriveDriver.deleteFile(name));
                }
                else {
                    _StdOut.putText("Error: You must enter a single file name.");
                }
            }
            else {
                _StdOut.putText("Error: Hard Drive must be formatted before use.");
            }
        };
        Shell.prototype.shellFormat = function (args) {
            if (_HardDrive.supported) {
                if (_CPU.isExecuting) {
                    _StdOut.putText("You may not format while programs are running.");
                }
                else {
                    _krnHardDriveDriver.krnHddFormat();
                    _StdOut.putText("Hard Drive Formated.");
                }
            }
            else {
                _StdOut.putText("Hard Drive is not supported in your browser.");
            }
        };
        Shell.prototype.shellLS = function (args) {
            if (_krnHardDriveDriver.formatted) {
                if (_HardDrive.supported) {
                    _StdOut.putText(_krnHardDriveDriver.listDir());
                }
                else {
                    _StdOut.putText("Hard Drive is not supported in your browser.");
                }
            }
            else {
                _StdOut.putText("Error: Hard Drive must be formatted before use.");
            }
        };
        Shell.prototype.shellChangeWeapon = function (args) {
            weaponIndex++;
            if (weaponIndex >= 4) {
                weaponIndex = 0;
            }
            console.log(beamWeapons[weaponIndex]);
            _StdOut.putText(beamWeapons[weaponIndex] + " selected.");
        };
        Shell.prototype.shellShoot = function (args) {
            switch (weaponIndex) {
                case 0:
                    _StdOut.putText("*pew* You fired your Power Beam.");
                    break;
                case 1:
                    _StdOut.putText("*zap* You fired your Wave Beam.");
                    break;
                case 2:
                    _StdOut.putText("*pachink* You fired your Ice Beam.");
                    break;
                case 3:
                    _StdOut.putText("*bang* You fired your Plasma Beam.");
                    break;
            }
        };
        Shell.prototype.shellBSOD = function (args) {
            _Kernel.krnTrapError("BSOD Test");
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            _Kernel.krnShutdown();
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        return Shell;
    })();
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
