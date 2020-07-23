/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import StyleConfigurator from './config/StyleConfigurator';
import ShapeConfigurator from './config/ShapeConfigurator';
import MarkerConfigurator from './config/MarkerConfigurator';
import MxClientConfigurator from './config/MxClientConfigurator';

/**
 * Configure the mxGraph graph that can be used by the lib
 * <ul>
 *     <li>styles
 *     <li>shapes
 *     <li>markers
 */
export default class MxGraphConfigurator {
  private readonly graph: mxGraph;

  constructor(container: HTMLElement) {
    //TODO: Requires changes in mxgraph-type-definitions as in the spec it is mentioned clearly:
    // '... If no root is specified then a new root mxCell with a default layer is created. ...'
    // See: https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGraphModel-js.html#mxGraphModel.mxGraphModel
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.graph = new mxGraph(container, new mxGraphModel(null));
    this.configureGraph();
    new StyleConfigurator(this.graph).configureStyles();
    new ShapeConfigurator().configureShapes();
    new MarkerConfigurator().configureMarkers();
    new MxClientConfigurator().configureMxCodec();
  }

  public getGraph(): mxGraph {
    return this.graph;
  }

  private configureGraph(): void {
    this.graph.setCellsLocked(true);
    this.graph.setCellsSelectable(false);
    this.graph.setEdgeLabelsMovable(false);

    this.graph.setHtmlLabels(true); // required for wrapping

    // To have the boundary event on the border of a task
    this.graph.setConstrainChildren(false);
    this.graph.setExtendParents(false);

    // Disable folding for container mxCell (pool, lane, sub process, call activity) because we don't need it.
    // This also prevents requesting unavailable images (see #185) as we don't override mxGraph folding default images.
    this.graph.foldingEnabled = false;
  }
}
