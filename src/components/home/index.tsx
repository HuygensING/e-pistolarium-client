import * as React from 'react'
import { connect } from 'react-redux'
import { HucSearchResults, SearchResults } from 'huc-ui-components'
import { SemanticSuggestions } from 'pergamon-ui-components'
import Facets from './facets'
import Aside from './aside'
import history from '../../store/history'
import { fullTextSearch, receiveSearchResults, clearSemanticSuggestions } from '../../actions/search';
import ResultBody from './result-body';
import FullTextSearch, { IProps as IFullTextSearchProps } from './full-text-search'

const Wrapper: React.SFC = (props) =>
	<div
		role="search"
		style={{
			display: 'grid',
			gridTemplateColumns: '320px 4em auto',
			margin: '2em auto',
			maxWidth: '1100px',
		}}
	>
		{props.children}
	</div>

export interface IProps extends IFullTextSearchProps {
	aggregate: any[]
	receiveSearchResults: (r: any, q?: string) => void
	requestingSemanticSuggestions: boolean
	searchResults: SearchResults
}
class Home extends React.PureComponent<IProps, null> {
	private timeline

	public async componentDidMount() {
		this.timeline = await import('timeline')
	}

	public render() {
		return (
			<Wrapper>
				<div style={{marginLeft: '2em'}}>
					<FullTextSearch {...this.props} />
					<SemanticSuggestions
						fullTextSearch={this.props.fullTextSearch}
						requesting={this.props.requestingSemanticSuggestions}
						semanticSuggestions={this.props.semanticSuggestions}
					/>
					<Facets receiveSearchResults={this.props.receiveSearchResults} />
				</div>
				<div />
				<div style={{ marginRight: '2em' }}>
					<HucSearchResults
						onClickResult={(result) => history.push(`/documents/${result.id}`)}
						resultBodyComponent={ResultBody}
						searchResults={this.props.searchResults}
					/>
					{
						(
							this.timeline != null &&
							this.props.aggregate.length
						) &&
						<div
							style={{
								bottom: 0,
								display: 'grid',
								gridTemplateColumns: '320px 3em auto 1em',
								margin: '0 auto',
								left: 0,
								right: 0,
								position: 'fixed',
								width: '1100px',
							}}
						>
							<div />
							<div />
							<div
								style={{
									backgroundColor: 'white',
									border: '1px solid #ccc',
									boxShadow: '0 0 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.23)',
									height: '40px',
									padding: '1em 1em 1.25em 1em',
								}}
							>
								<this.timeline.default
									aggregate={this.props.aggregate}
									domains={[{
										domainLabels: true,
										rulers: false,
										type: this.timeline.DomainType.Sparkline,
									}]}
									from={new Date(this.props.aggregate[0].year, 0, 1)}
									to={new Date(this.props.aggregate[this.props.aggregate.length - 1].year, 0, 1)}
								/>
								<div />
							</div>
							<div />
						</div>
					}
				</div>
				{
					(
						this.props.searchResults != null &&
						this.props.searchResults.total > 0
					) &&
					<Aside
						searchResults={this.props.searchResults}
					/>
				}
			</Wrapper>
		)
	}
}

export default connect(
	state => ({
		aggregate: state.search.aggregate,
		fullTextSearchQuery: state.search.fullTextSearchQuery,
		requestingSemanticSuggestions: state.search.requestingSemanticSuggestions,
		searchResults: state.search.results[state.search.results.length - 1],
		semanticSuggestions: state.search.semanticSuggestions,
	}),
	{
		clearSemanticSuggestions,
		fullTextSearch,
		receiveSearchResults,
	}
)(Home);