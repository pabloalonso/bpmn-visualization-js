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
import BpmnXmlParser from '../../../../../src/component/parser/xml/BpmnXmlParser';
import arrayContaining = jasmine.arrayContaining;
import anything = jasmine.anything;
import { TProcess } from '../../../../../src/component/parser/xml/bpmn-json-model/baseElement/rootElement/rootElement';
import { BPMNDiagram } from '../../../../../src/component/parser/xml/bpmn-json-model/BPMNDI';

describe('parse bpmn as xml for Activiti Designer 5.14.1', () => {
  it('bpmn with process with extension, ensure elements are present', () => {
    const a20Processe = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="startevent1" name="Start"></startEvent>
    <userTask id="usertask1" name="Task 1"></userTask>
    <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
    <exclusiveGateway id="exclusivegateway1" name="Gateway (split flow)"></exclusiveGateway>
    <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="exclusivegateway1"></sequenceFlow>
    <userTask id="usertask2" name="Task 3"></userTask>
    <sequenceFlow id="flow3" sourceRef="exclusivegateway1" targetRef="usertask2"></sequenceFlow>
    <userTask id="usertask3" name="Task 2"></userTask>
    <sequenceFlow id="flow4" sourceRef="exclusivegateway1" targetRef="usertask3"></sequenceFlow>
    <userTask id="usertask4" name="Task 4"></userTask>
    <sequenceFlow id="flow5" sourceRef="exclusivegateway1" targetRef="usertask4"></sequenceFlow>
    <exclusiveGateway id="exclusivegateway2" name="Gateway (merge flows)"></exclusiveGateway>
    <sequenceFlow id="flow6" sourceRef="usertask4" targetRef="exclusivegateway2"></sequenceFlow>
    <sequenceFlow id="flow7" sourceRef="usertask2" targetRef="exclusivegateway2"></sequenceFlow>
    <endEvent id="endevent1" name="End"></endEvent>
    <sequenceFlow id="flow8" sourceRef="exclusivegateway2" targetRef="endevent1"></sequenceFlow>
    <sequenceFlow id="flow9" sourceRef="usertask3" targetRef="endevent1"></sequenceFlow>
    <textAnnotation id="textannotation1">
      <text>3. Gateways display the X symbol in all cases (no user control) but actually do not write it to the file. Always displaying it seems quite reasonable if the attribute is stored in the model.
4. Gateway labels not displayed on diagram. </text>
    </textAnnotation>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="20.0" y="190.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
        <omgdc:Bounds height="55.0" width="105.0" x="100.0" y="180.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="exclusivegateway1" id="BPMNShape_exclusivegateway1">
        <omgdc:Bounds height="40.0" width="40.0" x="250.0" y="188.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
        <omgdc:Bounds height="55.0" width="105.0" x="335.0" y="181.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">
        <omgdc:Bounds height="55.0" width="105.0" x="335.0" y="90.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask4" id="BPMNShape_usertask4">
        <omgdc:Bounds height="55.0" width="105.0" x="335.0" y="270.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="exclusivegateway2" id="BPMNShape_exclusivegateway2">
        <omgdc:Bounds height="40.0" width="40.0" x="489.0" y="236.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="570.0" y="160.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="textannotation1" id="BPMNShape_textannotation1">
        <omgdc:Bounds height="81.0" width="201.0" x="50.0" y="350.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
        <omgdi:waypoint x="55.0" y="207.0"></omgdi:waypoint>
        <omgdi:waypoint x="100.0" y="207.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
        <omgdi:waypoint x="205.0" y="207.0"></omgdi:waypoint>
        <omgdi:waypoint x="250.0" y="208.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
        <omgdi:waypoint x="290.0" y="208.0"></omgdi:waypoint>
        <omgdi:waypoint x="335.0" y="208.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
        <omgdi:waypoint x="270.0" y="188.0"></omgdi:waypoint>
        <omgdi:waypoint x="270.0" y="117.0"></omgdi:waypoint>
        <omgdi:waypoint x="335.0" y="117.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
        <omgdi:waypoint x="270.0" y="228.0"></omgdi:waypoint>
        <omgdi:waypoint x="270.0" y="297.0"></omgdi:waypoint>
        <omgdi:waypoint x="335.0" y="297.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
        <omgdi:waypoint x="440.0" y="297.0"></omgdi:waypoint>
        <omgdi:waypoint x="509.0" y="297.0"></omgdi:waypoint>
        <omgdi:waypoint x="509.0" y="276.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow7" id="BPMNEdge_flow7">
        <omgdi:waypoint x="440.0" y="208.0"></omgdi:waypoint>
        <omgdi:waypoint x="508.0" y="208.0"></omgdi:waypoint>
        <omgdi:waypoint x="509.0" y="236.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow8" id="BPMNEdge_flow8">
        <omgdi:waypoint x="529.0" y="256.0"></omgdi:waypoint>
        <omgdi:waypoint x="587.0" y="256.0"></omgdi:waypoint>
        <omgdi:waypoint x="587.0" y="195.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow9" id="BPMNEdge_flow9">
        <omgdi:waypoint x="440.0" y="117.0"></omgdi:waypoint>
        <omgdi:waypoint x="587.0" y="117.0"></omgdi:waypoint>
        <omgdi:waypoint x="587.0" y="160.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    const json = new BpmnXmlParser().parse(a20Processe);

    expect(json).toMatchObject({
      definitions: {
        process: {
          id: 'myProcess',
          name: 'My process',
          startEvent: {
            id: 'startevent1',
            name: 'Start',
          },
          endEvent: {
            id: 'endevent1',
            name: 'End',
          },
          userTask: arrayContaining([anything()]),
          exclusiveGateway: arrayContaining([anything()]),
          sequenceFlow: arrayContaining([anything()]),
          textAnnotation: anything(),
        },
        BPMNDiagram: {
          BPMNPlane: {
            BPMNShape: arrayContaining([anything()]),
            BPMNEdge: arrayContaining([{ id: 'BPMNEdge_flow9', bpmnElement: 'flow9', waypoint: [anything(), anything(), anything()] }]),
          },
        },
      },
    });

    const process: TProcess = json.definitions.process as TProcess;
    expect(process.userTask).toHaveLength(4);
    expect(process.exclusiveGateway).toHaveLength(2);
    expect(process.sequenceFlow).toHaveLength(9);

    const bpmnDiagram: BPMNDiagram = json.definitions.BPMNDiagram as BPMNDiagram;
    expect(bpmnDiagram.BPMNPlane.BPMNShape).toHaveLength(9);
    expect(bpmnDiagram.BPMNPlane.BPMNEdge).toHaveLength(9);
  });
});
