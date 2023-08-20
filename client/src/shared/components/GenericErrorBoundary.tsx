import { Component, ErrorInfo, ReactNode } from "react"

interface GenericErrorBoundaryProps {
  children?: ReactNode
}

export default class GenericErrorBoundary extends Component<GenericErrorBoundaryProps>{
  readonly state = {hasError: false, errorMessage: ''}
  static getDerivedStateFromError(error) {
    return {hasError: true, errorMessage: error.toString()}
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong: {this.state.errorMessage}</p>
    }
    return this.props.children
  }
}