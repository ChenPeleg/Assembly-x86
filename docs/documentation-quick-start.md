# Documentation Quick Start Guide

## For New Contributors

Welcome! This guide will help you start contributing documentation to the Assembly x86 project quickly.

## 5-Minute Setup

### 1. Clone and Setup
```bash
git clone https://github.com/ChenPeleg/Assembly-x86.git
cd Assembly-x86
npm install
npm start
```

### 2. Navigate to Documentation
```
src/assets/documentation/
```

### 3. Choose a Topic
Review `docs/documentation-content-plan.md` to find what needs to be written.

### 4. Use a Template
Find templates in `docs/documentation-implementation-guide.md`.

### 5. Write and Test
- Write your content
- Test any code in the emulator
- Save as markdown (.md)

## Quick Templates

### Concept Document (Minimal)
```markdown
# Concept Name

## What You'll Learn
- Point 1
- Point 2
- Point 3

## Explanation
[Write 2-3 paragraphs explaining the concept]

## Example
```assembly
; Your code here
mov eax, 5
```

**What it does:** [Explain the code]

## Practice
Try modifying the code to [suggestion].

## Next: [Link to next topic]
```

### Instruction Document (Minimal)
```markdown
# INSTRUCTION

## Syntax
```assembly
INSTR dest, src
```

## What It Does
[One paragraph explanation]

## Example
```assembly
mov eax, 10
add eax, 5    ; eax = 15
```

## Common Uses
- Use 1
- Use 2
- Use 3
```

## Common Questions

### Q: What should I write about?
**A:** Check the documentation plan (`docs/documentation-content-plan.md`). Look for sections marked as "Priority: High".

### Q: How long should documents be?
**A:** Aim for 500-1500 words. Quality over quantity.

### Q: Do I need to test code?
**A:** Yes! All code must work in the emulator.

### Q: What if I make a mistake?
**A:** That's okay! Reviewers will help fix it.

### Q: How do I submit?
**A:** Create a pull request with your new markdown file.

## Priority Topics (Start Here!)

1. **Missing Basic Instructions:**
   - Create files in `06 instruction-set/` for common instructions
   - Use the instruction template
   - Start with: MOV, ADD, SUB, JMP, CALL, RET

2. **Simple Tutorials:**
   - Create files in `07 interactive-tutorials/`
   - Walk through a simple program step-by-step
   - Include code that runs in the emulator

3. **Quick Reference Cards:**
   - Create files in `11 reference/`
   - Make cheat sheets for common tasks
   - Format as tables for easy scanning

## Writing Tips

### ✅ Do This:
- Keep it simple
- Use examples
- Test your code
- Explain why, not just what
- Link to related topics

### ❌ Avoid This:
- Assuming too much knowledge
- Long paragraphs without breaks
- Code without explanations
- Technical jargon without definitions
- Dead or broken links

## File Naming

Place your file in the appropriate folder:
- Basics: `01 basics/`
- Number systems: `02 binary numbers/`
- Registers: `03 registers/`
- Instructions: `06 instruction-set/` (create if needed)
- Tutorials: `07 interactive-tutorials/` (create if needed)
- Projects: `08 projects/` (create if needed)

Name format: `[number]-[descriptive-name].md`

Example: `12-simple-calculator.md`

## Before You Submit

Check these boxes:
- [ ] Code tested in emulator
- [ ] Markdown formatting correct
- [ ] No spelling errors
- [ ] Links work
- [ ] Examples are clear
- [ ] Follows a template

## Example Pull Request

```markdown
### Documentation: Add MOV Instruction Guide

**Type:** New Documentation
**Section:** Instruction Set
**File:** src/assets/documentation/06 instruction-set/mov-instruction.md

**Description:**
Added comprehensive guide for the MOV instruction including:
- Syntax and variations
- Multiple examples
- Common use cases
- Practice exercises

**Testing:**
- All code examples tested in emulator
- Links verified
- Reviewed for clarity

**References:**
- Follows template from implementation guide
- Part of Phase 2 in content plan
```

## Getting Help

### Need Help?
1. Read the full guides:
   - `docs/documentation-content-plan.md`
   - `docs/documentation-implementation-guide.md`
2. Look at existing documentation for examples
3. Open an issue with the `documentation` label
4. Ask specific questions

### Found a Problem?
- Small fix? Just submit a PR
- Big change? Open an issue first
- Unclear content? Tag it with `needs-clarification`

## Sample Complete Document

Here's a minimal but complete documentation file:

```markdown
# The JMP Instruction

## What You'll Learn
- How to use JMP for unconditional jumps
- When to use JMP vs conditional jumps
- Common patterns with JMP

## Syntax
```assembly
jmp label       ; Jump to label
jmp register    ; Jump to address in register
```

## What It Does
JMP transfers program control to a different part of your code. Unlike conditional jumps, JMP always executes the jump.

## Example 1: Simple Loop
```assembly
section .text
    global _start

_start:
    mov ecx, 5          ; Counter

loop_start:
    ; Do something here
    dec ecx             ; Decrement counter
    cmp ecx, 0         ; Check if done
    jne loop_start      ; Conditional jump
    
    ; Done with loop
    jmp exit            ; Unconditional jump to exit

exit:
    mov eax, 60         ; Exit syscall
    xor edi, edi
    syscall
```

**Explanation:**
- Lines 7-10: Loop that runs 5 times
- Line 10: `jne` is a conditional jump (jump if not equal)
- Line 13: `jmp` unconditionally jumps to exit

**Try it:** Load this in the emulator and step through it to see the jumps.

## Example 2: Switch-Like Logic
```assembly
    mov eax, [choice]    ; Load choice
    
    cmp eax, 1
    je option1           ; Jump if equal to 1
    
    cmp eax, 2
    je option2           ; Jump if equal to 2
    
    jmp default          ; None matched, use default

option1:
    ; Handle option 1
    jmp done

option2:
    ; Handle option 2
    jmp done

default:
    ; Handle default case
    jmp done

done:
    ; Continue program
```

## Common Patterns

### Pattern 1: Exit Program
```assembly
jmp exit
; ... other code ...
exit:
    mov eax, 60
    xor edi, edi
    syscall
```

### Pattern 2: Skip Code
```assembly
    ; Check condition
    cmp eax, 0
    je skip_section
    
    ; Code to skip
    ; ...
    
skip_section:
    ; Continue here
```

## Practice
1. Create a program that uses JMP to create an infinite loop
2. Modify Example 2 to handle 4 options instead of 2
3. Write code that uses JMP to implement a simple state machine

## Common Mistakes

**Mistake 1:** Forgetting the label
```assembly
jmp          ; Missing label - won't assemble!
```

**Mistake 2:** Jumping into the middle of an instruction
```assembly
; This can cause crashes - always jump to instruction boundaries
```

## See Also
- Conditional Jumps (JE, JNE, JG, etc.)
- CALL instruction (for subroutines)
- Loops in assembly

## Next Steps
Learn about conditional jumps: [Link to conditional jumps doc]
```

## Resources

### Documentation Files
- Content Plan: `docs/documentation-content-plan.md`
- Implementation Guide: `docs/documentation-implementation-guide.md`
- This Quick Start: `docs/documentation-quick-start.md`

### External Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [Intel x86 Manual](https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html)
- [NASM Documentation](https://www.nasm.us/doc/)

## Recognition

Contributors will be:
- Listed in the project contributors
- Credited in the documentation they create
- Recognized in project updates

Thank you for helping make Assembly x86 documentation better!

---

**Ready to start?** Pick a topic from the content plan and dive in!
