import { useId } from '@reach/auto-id';
import React, {
	type HTMLAttributes,
	type PropsWithChildren,
	useContext,
} from 'react';

import {
	HeadingIdContext,
	HeadingLevelContext,
} from '@/context/HeadingContext';
import { cn } from '@/services/classNames';

import s from './Region.module.scss';

export interface RegionProps extends HTMLAttributes<HTMLDivElement> {
	Tag?: 'main' | 'section';
	withContainer?: boolean;
}

/**
 *
 * @see https://sergiodxa.com/articles/keep-heading-levels-consistent-with-react-context
 * @see https://beta.reactjs.org/learn/passing-data-deeply-with-context
 */

export function Region({
	id,
	children,
	withContainer = false,
	Tag = 'section',
	className,
	...props
}: PropsWithChildren<RegionProps>) {
	const internalId = useId(id);
	const headingLevel = useContext(HeadingLevelContext);
	const nextLevel = headingLevel + 1;
	return (
		<HeadingIdContext.Provider value={internalId}>
			<HeadingLevelContext.Provider value={nextLevel}>
				<Tag
					className={cn(
						Tag === 'section' && s.Region,
						withContainer && s.container,
						className
					)}
					{...props}
					aria-labelledby={internalId}
				>
					{children}
				</Tag>
			</HeadingLevelContext.Provider>
		</HeadingIdContext.Provider>
	);
}
