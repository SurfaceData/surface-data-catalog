import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type DatasetSubsetLayoutProps = {
  children: React.ReactNode
}

const DatasetSubsetsLayout = ({ children }: DatasetSubsetLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.datasetSubsets()}
            className="rw-link"
          >
            DatasetSubsets
          </Link>
        </h1>
        <Link
          to={routes.newDatasetSubset()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New DatasetSubset
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default DatasetSubsetsLayout
