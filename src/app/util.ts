export const urlServeur="https://localhost:8000";

export const MAX_FICHIER_VOLUME = 500 * 1024;

export function tr(msg:string, alertOn=false, consoleOn=true)
{
    if (alertOn)
        alert(msg);
    if (consoleOn)
        console.log(msg);
}