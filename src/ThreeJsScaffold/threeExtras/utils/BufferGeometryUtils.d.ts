import { BufferAttribute, BufferGeometry } from 'three';

export namespace BufferGeometryUtils {
    export function mergeBufferGeometries(geometries: BufferGeometry[], useGroups?: boolean): BufferGeometry;
    export function computeTangents(geometry: BufferGeometry): null;
    export function mergeBufferAttributes(attributes: BufferAttribute[]): BufferAttribute;
}
