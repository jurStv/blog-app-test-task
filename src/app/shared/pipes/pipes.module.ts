import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropPipe } from './prop.pipe';
import { PathPipe } from './path.pipe';
import { DefaultToPipe } from './defaultTo.pipe';
import { IsEmptyPipe } from './isEmpty.pipe';
import { NotPipe } from './not.pipe';
import { ValuesPipe } from './values.pipe';
import { LogPipe } from './log.pipe';
import { HasInPipe } from './hasIn.pipe';
import { PathOrPipe } from './pathOr.pipe';
import { MapPropPipe } from './mapProp.pipe';
import { JoinPipe } from './join.pipe';
import { AndPipe } from './and.pipe';
import { PrependPipe } from './prepend.pipe';
import { HeadPipe } from './head.pipe';
import { ChainPipe } from './chain.pipe';
import { EqualsPipe } from './equals.pipe';
import { EqualsOrPipe } from './equalsOr.pipe';
import { ToBooleanPipe } from './toBoolean.pipe';
import { LengthPipe } from './length.pipe';
import { GtePipe } from './gte.pipe';
import { TruncatePipe } from './truncate.pipe';

const PIPES = [PropPipe, PathPipe, DefaultToPipe, IsEmptyPipe, NotPipe, ValuesPipe, LogPipe, HasInPipe, PathOrPipe, MapPropPipe, JoinPipe, AndPipe, PrependPipe, HeadPipe, ChainPipe, EqualsPipe, EqualsOrPipe, ToBooleanPipe, LengthPipe, GtePipe, TruncatePipe];

@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule
  ],
  exports: [...PIPES],
})
export class PipesModule { }
