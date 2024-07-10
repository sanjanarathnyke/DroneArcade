import { cn } from '../lib/utilities'

type TrafficButtonProps = {
  className?: string
  onClick: () => void
}

export function TrafficButton({ className, onClick }: TrafficButtonProps) {
  return (
    <button
      className={cn('btn-traffic', className)}
      onClick={onClick}
    >
      &nbsp;
    </button>
  )
}

export default function TitleBar() {
  return (
    <div className="h-[30px] w-full bg-[#001B41] flex items-center z-50 sticky top-0 left-0">
      <div className="h-full flex items-center px-3 gap-2">
        <TrafficButton
          className="bg-red-500 hover:bg-red-400"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('ipc-app-ctl', 'close')
          }}
        />
        <TrafficButton
          className="bg-yellow-500 hover:bg-yellow-400"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('ipc-app-ctl', 'minimize')
          }}
        />
        <TrafficButton
          className="bg-green-500 hover:bg-green-400"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('ipc-app-ctl', 'maximize')
          }}
        />
      </div>
      <div className="native-draggable flex-1 h-full">
      </div>
    </div>
  )
}

