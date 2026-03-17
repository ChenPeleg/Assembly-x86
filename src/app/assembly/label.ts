import {LabelParameter} from "../emulation/instruction/parameter";
import {AssemblyException} from "./assembler";

class Label
{
    constructor(public name: string, public local: boolean, public address: number)
    {

    }
}

export class LabelResolver
{
    private labels: any = {};
    // @ts-ignore
  private lastGlobalLabel: Label = null;
    private unresolvedParameters: { labelParameter: LabelParameter, line: number }[] = [];

    addLabel(address: number, label: string, local: boolean = false)
    {
        label = this.normalizeLabelName(label, local, address);

        if (this.hasLabel(label))
        {
            throw new AssemblyException("Duplicate label found: " + label);
        }

        this.labels[label] = new Label(label, local, address);

        if (!local)
        {
            this.lastGlobalLabel = this.labels[label];
        }
    }

    markUnresolvedParameter(labelParameter: LabelParameter, line: number)
    {
        if (labelParameter.label.startsWith("."))
        {
            if (this.lastGlobalLabel === null)
            {
                throw new AssemblyException("Local label used without global label: " + labelParameter.label, line);
            }

            labelParameter.label = this.lastGlobalLabel.name + labelParameter.label;
        }

        this.unresolvedParameters.push({
            labelParameter: labelParameter,
            line: line
        });
    }
    resolveAddresses()
    {
        this.unresolvedParameters.forEach((record: { labelParameter: LabelParameter, line: number }) => {
            if (!Object.hasOwn(this.labels, record.labelParameter.label))
            {
                throw new AssemblyException("Unknown label " + record.labelParameter.label, record.line + 1);
            }

            record.labelParameter.resolveLabel(this.labels[record.labelParameter.label].address);
        });
    }

    private normalizeLabelName(label: string, local: boolean, address: number): string
    {
        if (local)
        {
            let previousLabel: Label = this.findPreviousGlobalLabel(address);

            if (previousLabel === undefined)
            {
                throw new AssemblyException("Local label without a global label: " + label);
            }

            return previousLabel.name + "." + label;
        }

        return label;
    }
    private hasLabel(label: string): boolean
    {
        return Object.hasOwn(this.labels, label);
    }
    private findPreviousGlobalLabel(address: number): Label
    {
        return Object.values(this.labels).findLast((label: any) => !(label as Label).local && (label as Label).address <= address) as Label;
    }
}
