import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type DatasetLayoutProps = {
  children: React.ReactNode
}

const DatasetsLayout = ({ children }: DatasetLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.datasets()}
            className="rw-link"
          >
            Datasets
          </Link>
        </h1>
        <Link
          to={routes.newDataset()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Dataset
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default DatasetsLayout
