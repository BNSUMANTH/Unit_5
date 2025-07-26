import os from "node:os";
function formatBytes(bytes) {
  return (bytes/(1024**3)).toFixed(2)+" GB";
}

function formatMB(bytes) {
  return (bytes/(1024**2)).toFixed(2)+" MB";
} 



export function getSystemInfo(){
  let d=os.cpus();
  let memory= process.memoryUsage();

   console.log(`Architecture: ${os.arch()}`);
   console.log(`Cpu Cores: ${d.length}`);
   console.log(`Cpu Model: ${d[0].model}`);
   console.log(`Total Memory:${formatBytes(os.totalmem())} `);
   console.log(`Free Memory: ${formatBytes(os.freemem())}`);
   console.log(`Heap Memory Used:${formatMB(memory.heapUsed)}`);
   console.log(`Heap Memory Total:${formatMB(memory.heapTotal)} `);
   console.log(`Hostname: ${os.hostname()}`);
   console.log(`Os Type: ${os.type()}`);
}
