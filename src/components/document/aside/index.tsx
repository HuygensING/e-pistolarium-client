import * as React from 'react'
import { Aside, Panel, HucOffCanvasAside } from 'huc-ui-components'
import { AnnotationList, byStartEnd, IAnnotation } from 'pergamon-ui-components'

export interface IProps {
	activateAnnotation: (a: IAnnotation) => void
	activeAnnotation: IAnnotation
	onChangeActiveAside: (a: Aside) => void
	rootAnnotation: IAnnotation
}
const OffCanvasAside: React.SFC<IProps> = (props) =>
	<HucOffCanvasAside
		onChangeActiveAside={props.onChangeActiveAside}
		open
	>
		<Panel
			title="Named entities"
			type={Aside.Annotations}
		>
			<AnnotationList
				activateAnnotation={props.activateAnnotation}
				activeAnnotation={props.activeAnnotation}
				filter={((a: IAnnotation) =>
					['persName', 'placeName', 'geogName', 'name'].indexOf(a.type) > -1
				)}
				rootAnnotation={props.rootAnnotation}
				sort={byStartEnd}
			/>
			<h2 style={{ margin: '1em 0' }}>Notes</h2>
			<AnnotationList
				activateAnnotation={props.activateAnnotation}
				activeAnnotation={props.activeAnnotation}
				filter={((a: IAnnotation) =>
					['note'].indexOf(a.type) > -1
				)}
				rootAnnotation={props.rootAnnotation}
				sort={byStartEnd}
			/>
		</Panel>
	</HucOffCanvasAside>

export default OffCanvasAside