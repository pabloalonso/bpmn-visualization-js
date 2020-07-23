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
export class DropFileUserInterface {
  private document: Document;
  private head: Element;
  private body: Element;

  constructor(private window: Window, private outerContainerId: string, private containerToFadeId: string, private dropCallback: (file: File) => void) {
    this.document = window.document;
    this.head = document.head;
    this.body = document.body;
    this.initializeDragAndDrop();
  }

  private initializeDragAndDrop(): void {
    this.addDomElements();
    this.addStyle();

    const dropContainer = document.getElementById(this.outerContainerId);
    if (!dropContainer) {
      throw Error(`Element #${this.outerContainerId} not found, dropping file functionality will not work. Make sure you have no typo in parameter: outerContainerId`);
    }
    const containerToBeFaded = document.getElementById(this.containerToFadeId);
    if (!containerToBeFaded) {
      throw Error(`Element #${this.containerToFadeId} not found, dropping file functionality will not work. Make sure you have no typo in parameter: containerToFadeId`);
    }
    // prevent loading file by the browser
    this.preventDefaultsOnEvents(['dragover', 'drop'], this.window);
    this.preventDefaultsOnEvents(['dragover', 'dragleave', 'drop'], dropContainer);

    this.addEventsOnDropContainer(dropContainer, containerToBeFaded);
    this.addEventsOnDocument(this.outerContainerId, containerToBeFaded);
  }

  private preventDefaults(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private preventDefaultsOnEvents(events: string[], container: Element | Window): void {
    events.forEach(eventName => {
      container.addEventListener(eventName, this.preventDefaults, false);
    });
  }

  private addDomElements(): void {
    const p = this.document.createElement('p');
    p.textContent = 'open BPMN diagram';
    const innerDiv = this.document.createElement('div');
    innerDiv.classList.add('drop-here-text');
    innerDiv.appendChild(p);
    const containerDiv = this.document.createElement('div');
    containerDiv.id = this.outerContainerId;
    containerDiv.appendChild(innerDiv);
    this.body.insertBefore(containerDiv, this.body.firstChild);
  }

  private addStyle(): void {
    // region CSS
    const css = `
#${this.containerToFadeId} {
    opacity: 1;
}
#${this.containerToFadeId}.faded {
    opacity: 0.1;
}
#${this.outerContainerId} {
    overflow: hidden;
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    font-weight: bold;
    text-align: center;
    color: #555;
}
#${this.outerContainerId} .drop-here-text {
    display: none;
    border: 2px solid transparent;
    width: 98%;
    height: 98%;
    margin: 1%;
    overflow: hidden;
}
#${this.outerContainerId} .drop-here-text p {
    margin-top: 45%;
    font-style: normal;
    font-family: monospace;
    font-size: 40px;
    color: rgba(1,1,1,.2);
}
#${this.outerContainerId}.dragging  .drop-here-text {
    cursor: default;
    display: block;
    border: 2px dashed #555;
    border-radius: 7px;
}`;
    // endregion
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    this.head.appendChild(style);
  }

  private addEventsOnDropContainer(container: HTMLElement, containerToBeFaded: HTMLElement): void {
    container.addEventListener('dragover', this.getAddClassCallback(containerToBeFaded, false), false);
    container.addEventListener('mousedown', this.getRemoveClassCallback(containerToBeFaded, false), false);
    container.addEventListener('drop', this.getDropCallbackForElement(containerToBeFaded, false, this.dropCallback), false);
  }

  private addEventsOnDocument(outerContainerId: string, containerToBeFaded: HTMLElement): void {
    this.document.addEventListener('dragover', this.getAddClassCallback(containerToBeFaded, true, outerContainerId), false);
    this.document.addEventListener('dragleave', this.getRemoveClassCallback(containerToBeFaded, true, outerContainerId), false);
    this.document.addEventListener('drop', this.getDropCallbackForElement(containerToBeFaded, true, this.dropCallback, outerContainerId), false);
  }

  private getAddClassCallback(containerToBeFaded: HTMLElement, isDocument: boolean, outerContainerId?: string) {
    return function(): void {
      // TODO: handle 'this' implicit any type
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      isDocument ? this.querySelector('#' + outerContainerId).classList.add('dragging') : this.classList.add('dragging');
      containerToBeFaded.classList.add('faded');
    };
  }

  private getRemoveClassCallback(containerToBeFaded: HTMLElement, isDocument: boolean, outerContainerId?: string) {
    return function(): void {
      // TODO: handle 'this' implicit any type
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      isDocument ? this.querySelector('#' + outerContainerId).classList.remove('dragging') : this.classList.remove('dragging');
      containerToBeFaded.classList.remove('faded');
    };
  }

  private getDropCallbackForElement(containerToBeFaded: HTMLElement, isDocument: boolean, dropCallback: (file: File) => void, outerContainerId?: string) {
    return function(event: DragEvent): void {
      try {
        const dt = event.dataTransfer;
        const files = dt?.files;
        if (files && files[0]) {
          dropCallback(files[0]);
        }
      } catch (e) {
        // TODO error management
        console.error(e as Error);
      } finally {
        // TODO: handle 'this' implicit any type
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        isDocument ? this.querySelector('#' + outerContainerId).classList.remove('dragging') : this.classList.remove('dragging');
        containerToBeFaded.classList.remove('faded');
      }
    };
  }
}
