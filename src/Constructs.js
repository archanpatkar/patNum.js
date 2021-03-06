class Construct 
{
    toString(){}
    equals(n){}
    add(n){}
    substract(n){}
    divide(n){}
    multiply(n){}
}

class Num
{
    constructor(num)
    {
        this.num = num;
    }

    toString()
    {
        return "" + this.num;
    }

    equals(n)
    {
        return this.num == n.num;
    }

    add(n)
    {
        return this.num + n.num;
    }

    substract(n)
    {
        return this.num - n.num;
    }

    divide(n)
    {
        return this.num / n.num;
    }

    multiply(n)
    {
        return this.num * n.num;
    }
}

function gcd(a,b)
{
    if(b == 0) return a; 
    else return gcd(b, a % b);
}

function lcm(a,b)
{
    return a / gcd(a,b) * b
}

function decToInt(n)
{
    return parseInt((""+n).split(".").reduce((acc,v) => acc+v));
}

function digitsAfterDot(n)
{
    return (""+n).split(".")[1].length;
}

function digits(n)
{
    if(n == 0) return 0;
    return 1 + digits(n/10);
}

class Fraction extends Construct
{
    constructor(n=1,d=1)
    {
        super();
        if(d == 0) throw new Error("Cannot Divide by Zero");
        let flag1 = false;
        let flag2 = false;
        if(!Number.isInteger(n) && !(n instanceof Construct))
        {
            flag1 = true;
            this.n = decToInt(n);
        }
        else this.n = n;
        if(!Number.isInteger(d) && !(n instanceof Construct))
        {
            flag2 = true;
            this.n = decToInt(n);
        }
        else this.d = d;
        if(flag1 || flag2)
        {
            if(flag1)
            {
                this.d *= 10**digitsAfterDot(n);
            }
            if(flag2)
            {
                this.n *= 10**digitsAfterDot(d);
            }
            this.reduce();
        }
        // if(typeof(this.n) == "number") this.n = new Num(this.n);
        // if(typeof(this.d) == "number") this.d = new Num(this.d);
    }

    add(x)
    {
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            if(typeof(this.n) == "number" && typeof(x.n) == "number" && typeof(this.d) == "number" && typeof(x.d) == "number")
            {
                if(this.d == x.d) 
                {
                    temp.n = this.n + x.n;
                    temp.d = this.d;
                }
                else
                {
                    temp.n = (x.d * this.n) + (this.d * x.n);
                    temp.d = (this.d * x.d);
                }
            }
            else
            {
                let {x:d1,y:d2} = coerce(this.d,x.d);
                if(d1.equals(d2))
                {
                    let {x:n1,y:n2} = coerce(this.n,x.n);
                    temp.n = n1.add(n2);
                    temp.d = d1;
                }
                else
                {
                    let {x:n1,y:d2} = coerce(this.n,x.d);
                    temp.n = d2.multiply(n1);
                    let {x:d1,y:n2} = coerce(this.d,x.n);
                    temp.n.add(d1.multiply(n2));
                    temp.d = d1.multiply(d2);
                }
            }
            return temp;
        }
        else
        {
            let {x:i,y:j} = coerce(this,x);
            return i.add(j);
        }
    }

    substract(x)
    {
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            if(typeof(this.n) == "number" && typeof(x.n) == "number" && typeof(this.d) == "number" && typeof(x.d) == "number")
            {
                if(this.d == x.d) 
                {
                    temp.n = this.n - x.n;
                    temp.d = this.d;
                }
                else
                {
                    temp.n = (x.d * this.n) - (this.d * x.n);
                    temp.d = (this.d * x.d);
                }
            }
            else
            {
                let {d1:x,d2:y} = coerce(this.d,x.d);
                if(d1.equals(d2))
                {
                    let {n1:x,n2:y} = coerce(this.n,x.n);
                    temp.n = n1.add(n2);
                    temp.d = d1;
                }
                else
                {
                    let {n1:x,d2:y} = coerce(this.n,x.d);
                    temp.n = d2.multiply(n1);
                    let {d1:x,n2:y} = coerce(this.d,x.n);
                    temp.n.substract(d1.multiply(n2));
                    temp.d = d1.multiply(d2);
                }
            }
            return temp;
        }
        else
        {
            let {i:x,j:y} = coerce(this,x);
            return i.substract(j);
        }
    }
    
    multiply(x)
    {
        if(x instanceof Fraction)
        {
            let temp = new Fraction(1,1);
            if(typeof(this.n) == "number" && typeof(x.n) == "number")
            {
                temp.n = this.n * x.n;
            }
            else
            {
                let {n1:x,n2:y} = coerce(this.n,x.n);
                temp.n = n1.multiply(n2);
            }
            if(typeof(this.d) == "number" && typeof(x.d) == "number")
            {
                temp.d = this.d * x.d;
            }
            else
            {
                let {d1:x,d2:y} = coerce(this.d,x.d);
                temp.d = d1.multiply(d2);
            }
            return temp;
        }
        else
        {
            let {i:x,j:y} = coerce(this,x);
            return i.multiply(j);
        }
    }

    divide(x)
    {
        if(x instanceof Fraction)
        {
            return this.multiply(x.reciprocal());
        }
        else
        {
            let {i:x,j:y} = coerce(this,x);
            return i.divide(j);
        }
    }

    equals(n)
    {
        if(typeof(this.n) == "number" && typeof(n.n) == "number" && typeof(this.d) == "number" && typeof(n.d) == "number")
            return this.n == n.n && this.d == n.d;
        else
            return this.n.equals(n.n) && this.d.equals(n.d);
    }

    reciprocal()
    {
        return new Fraction(this.d,this.n);
    }

    reduce()
    {
        const gcf = gcd(this.n,this.d);
        this.n /= gcf;
        this.d /= gcf;
        return this;
    }

    gcf()
    {
        return gcd(this.n,this.d);
    }

    toDecimal()
    {
        return this.n/this.d;
    }

    toString()
    {   
        return `${(this.n instanceof Construct)?this.n.toString():this.n}/${(this.d instanceof Construct)?this.d.toString():this.d}`;
    }
}

function recurringToFraction(bd,nrd,rd)
{
    let whole;
    let wholenr;
    let nd;
    let ndr;
    if(nrd != undefined)
    {
        whole = parseInt("" + bd + nrd + rd);
        wholenr = parseInt("" + bd + nrd);
        nd = 10**(("" + nrd + rd).length);
        ndr = 10**(("" + nrd).length);
    }
    else 
    {   
        whole = parseInt("" + bd + rd);
        wholenr = parseInt("" + bd);
        nd = 10**(("" + rd).length);
        ndr = 10**0;
    }
    return new Fraction(whole-wholenr,nd-ndr);
}

class Complex extends Construct
{
    constructor(...val)
    {
        super();
        if(val)
        {
            if(val.length > 1)
            {
                this.a = val[0];
                this.b = val[1];
            }
            else if(val.length == 1)
            {
                this.a = 0;
                this.b = val[0];
            }
            else
            {
                this.a = 0;
                this.b = 0;
            }
        }
    }

    add(n)
    {
        if(n instanceof Complex)
        {
            var temp = new Complex();
            if(typeof(this.a) == "number" && typeof(n.a) == "number")
            {
                temp.a = this.a + n.a;
            }
            else
            {
                let {x,y} = coerce(this.a,n.a);
                temp.a = x.add(y);
            }
            if(typeof(this.b) == "number" && typeof(n.b) == "number")
            {
                temp.b = this.b + n.b;
            }
            else
            {
                let {x,y} = coerce(this.b,n.b);
                temp.b = x.add(y);
            }
            return temp;
        }
        else
        {
            let {x,y} = coerce(this,n);
            return x.add(y);
        }
    }

    substract(n)
    {
        if(n instanceof Complex)
        {
            var temp = new Complex();
            if(typeof(this.a) == "number" && typeof(n.a) == "number")
            {
                temp.a = this.a - n.a;
            }
            else
            {
                let {x,y} = coerce(this.a,n.a);
                temp.a = x.substract(y);
            }
            if(typeof(this.b) == "number" && typeof(n.b) == "number")
            {
                temp.b = this.b - n.b;
            }
            else
            {
                let {x,y} = coerce(this.b,n.b);
                temp.b = x.substract(y);
            }
            return temp;
        }
        else
        {
            let {x,y} = coerce(this,n);
            return x.substract(y);
        }
    }

    multiply(n)
    {
        if(n instanceof Complex)
        {
            var temp = new Complex();
            if(typeof(this.a) == "number" && typeof(n.a) == "number")
            {
                temp.a = (this.a * n.a) + ((this.b * n.b) * -1);
            }
            else
            {
                let {a1,a2} = coerce(this.a,n.a);
                let {b1,b2} = coerce(this.b,n.b);
                temp.a = a1.multiply(a2).add(b1.multiply(b2).multiply(-1));
            }
            if(typeof(this.b) == "number" && typeof(n.b) == "number")
            {
                temp.b = (this.a * n.b) + (this.b * n.a);
            }
            else
            {
                let {a1,b2} = coerce(this.a,n.b);
                let {b1,a2} = coerce(this.b,n.a);
                temp.a = a1.multiply(b2).add(b1.multiply(a2));
            }
            return temp;
        }
        else
        {
            let {x,y} = coerce(this,n);
            return x.multiply(y);
        }
        return temp;
    }

    divide(n)
    {
        var temp;
        if(n instanceof Complex)
        {
            let denom = (n.a * n.a) - ( (n.b * n.b) * -1 );
            if(denom != 0)
            {
                temp = this.multiply(n);
                temp.a /= denom;
                temp.b /= denom;
            }
        }
        else
        {
            if(n != 0)
            {
                temp = new Complex();
                temp.a = this.a / n;
                temp.b = this.b / n;
            }
            else throw new Error("Cannot Divide by Zero");
        }
        return temp;
    }

    conjugate()
    {
        return new Complex(this.a,-this.b);
    }

    toArray()
    {
        return [this.a,this.b];
    }

    addinv()
    {
        return new Complex(-this.a,-this.b);
    }

    mulinv()
    {
        return new Complex( 
            ( this.a / (this.a ** 2) + (this.b ** 2) ) , 
            ( -this.b / (this.a ** 2) + (this.b ** 2) ) 
        );
    }

    mod()
    {
        return Math.sqrt(this.a ** 2 + this.b ** 2);
    }

    pow(n)
    {
        const r = this.mod();
        const iv = Math.atan(this.b/this.a);
        let temp = r ** n;
        let a = temp * (Math.cos(n * iv));
        let b = temp * (Math.sin(n * iv));
        return new Complex(a,b);
    }

    sqrt(n = 2)
    {
        return this.pow(1/n);
    }

    exp()
    {
        // Source for the Algorithm
        // https://math.stackexchange.com/questions/9770/understanding-imaginary-exponents
        const x = Math.exp(this.a);
        return new Complex(
            (x * Math.cos(this.b)),
            (x * Math.sin(this.b)) 
        );
    }

    log()
    {
        // Source for the Algorithm
        // http://www.chemistrylearning.com/logarithm-of-complex-number/
        return new Complex(
            Math.log10(this.mod()),
            Math.atan(this.b/this.a)
        );
    }

    sin()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.sin(this.a) * Math.cosh(this.a),
            Math.cos(this.a) * Math.sinh(b)
        );
    }

    cos()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.cosh(this.a) * Math.cos(this.a),
            Math.sinh(this.a) * Math.sin(b)
        );
    }

    sinh()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.sinh(this.a) * Math.cos(this.a),
            Math.cosh(this.a) * Math.sin(b)
        );
    }

    cosh()
    {
        // Source for the Algorithm
        // http://www.milefoot.com/math/complex/functionsofi.htm
        return new Complex(
            Math.cos(this.a) * Math.cosh(this.a),
            -(Math.sin(this.a) * Math.sinh(b))
        );
    }

    angle()
    {
        return ( Math.atan(this.b/this.a) * 180 ) / Math.PI;
    }

    toString()
    {
        if(this.a != 0 && this.b != 0)
        {
            if(this.b < 0) return `${this.a} - ${Math.abs(this.b)}i`;
            else return `${this.a} + ${(Math.abs(this.b) == 1)?(this.b == -1)?"-":"":this.b}i`;
        }
        else if(this.b != 0) return `${(Math.abs(this.b) == 1)?(this.b == -1)?"-":"":this.b}i`;
        else if(this.a != 0) return `${this.a}`;
        else return "";
    }

}

class Polynomial
{
    constructor(vals,vars=["x"])
    {
        this.coeffs = [];
        this.vars = vars;
        // for(let i in vals) this.coeffs.push( [ vals[i] , vals.length-i-1 ] );
    }

    degree()
    {
        return this.coeffs.length;
    }

    add(p)
    {
        if(p instanceof Polynomial)
        {
            const temp = [];
            if(this.degree() == p.degree())
            {
                for(let i in this.coeffs)
                {
                    temp.push(this.coeffs[i][0] + p.coeffs[i][0]);
                }
            }
            else
            {
                let bigger = 0;
                let smaller = 0;
                if(this.degree()>p.degree()) 
                {
                    bigger = this;
                    smaller = p;
                }
                else
                {
                    bigger = p;
                    smaller = this
                }
                let offset = bigger.degree()-smaller.degree();
                for(let i = 0;i < offset;i++)
                {
                    temp.push([bigger.coeffs[i][0],bigger.degree()-i-1]);
                }
                for(let i = 0;i < smaller.degree();i++)
                {
                    let rec = [0,smaller.degree()-i-1];
                    if(bigger.coeffs[i+offset] != undefined)
                    {
                        rec[0] = bigger.coeffs[i+offset][0];
                    }
                    if(smaller.coeffs[i] != undefined)
                    {
                        rec[0] = rec[0] + smaller.coeffs[i][0];
                    }
                    temp.push(rec);
                }
            }
            const rp = new Polynomial();
            rp.coeffs = temp;
            return rp;
        }

    }

    substract(p)
    {
        const temp = [];
        for(let c in p.coeffs)
        {
            if(c == 0) temp.push(-p.coeffs[c][0]);
            else temp.push(p.coeffs[c][0]);
        }
        return this.add(new Polynomial(...temp));
    }

    multiply(p)
    {
        let temp = [];
        for(let c of this.coeffs)
        {
            for(let d of p.coeffs)
            {
                temp.push([c[0]*d[0],c[1]+d[1]]);
            }
        }
        const rp = new Polynomial();
        rp.coeffs = temp;
        rp.reduce();
        return rp;
    }

    reduce()
    {
        let temp = [];
        for(let i in this.coeffs)
        {
            let flag = true;
            for(let j in this.coeffs)
            {
                if(i != j && this.coeffs[i][1] == this.coeffs[j][1])
                {
                    temp.push([this.coeffs[i] + this.coeffs[j],this.coeffs[i][1]]);
                    flag = false;
                }   
            }
            if(flag)
            {
                temp.push(this.coeffs[i]);
            }
        }
    }

    toString()
    {
        let str = "";
        for(let i = 0;i < this.coeffs.length;i++)
        {
            let c = this.coeffs[i][0];
            let pow = this.coeffs[i][1];
            if(i != 0) str += (c>=0?"+":"") + (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
            else str += (c==1?"":c) + (pow==0?"": (pow==1?"x":`x^${pow}`));
        }
        return str;
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Matrix extends Construct
{
    // Static Methods

    static of(rows,columns)
    {
        const m = new Matrix(null,rows,columns,true);
        return m;
    }

    static random(rows,columns)
    {
        const m = new Matrix(null,rows,columns,true);
        m.randomize();
        return m;
    }

    static from(array)
    {
        return new Matrix(array);
    }

    static identity(rows,columns)
    {
        let m;
        if(rows && columns) m = Matrix.of(rows,columns);
        else if(rows instanceof Matrix) m = Matrix.of(rows.rows,rows.columns);
        m.diagonal(1, _ => 1);
        return m;
    }

    constructor(array,rows = null,columns = null,fill = false)
    {
        super();
        this.data = array;
        if(rows && columns)
        {
            this.rows = rows;
            this.columns = columns;
            if(fill)
            {
                if(this.data == null || this.data == undefined)
                {
                    this.data = [];
                }
                for(let i = 0; i < rows; i++)
                {
                    let row = [];
                    for(let j = 0; j < columns; j++)
                    {
                        row.push(0);
                    }
                    this.data.push(row);
                }
            }
        }
        else
        {
            this.rows = 0;
            this.columns = 0;
            for(let row of this.data)
            {
                if(typeof row == "number" || row instanceof Construct)
                {
                    this.columns++;
                    if(this.rows == 0)
                    {
                        this.rows = 1;
                    }
                }
                else if(Array.isArray(this.data))
                {
                    this.rows++;
                    if(this.columns == 0)
                    {
                        this.columns = row.length;
                    }
                }
            }
        }
    }

    to(row,column,value)
    {
        this.data[row - 1][column - 1] = value;
        return this;
    }

    at(row,column)
    {
        return this.data[row - 1][column - 1]; 
    }

    fill(n)
    {
        this.transform( (v) => n );
        return this;
    }

    identity()
    {
        return Matrix.identity(this);
    }

    _add(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1+n2;
        else 
        {
            let {x,y} = coerce(n1,n2);
            return x.add(y);
        } 
    }

    _substract(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1-n2;
        else 
        {
            let {x,y} = coerce(n1,n2);
            return x.substract(y);
        } 
    }


    _multiply(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1*n2;
        else return n1.multiply(n2);
    }

    _divide(n1,n2)
    {
        if(typeof n1 == "number" && typeof n2 == "number") return n1*n2;
        else return n1.divide(n2);
    }

    add(matrix)
    {
        return this.operateWith(matrix, this._add );
    }

    substract(matrix)
    {
        return this.operateWith(matrix, this._substract );
    }

    multiply(matrix)
    {
        return this.operateWith(matrix, this._multiply );
    }

    divide(matrix)
    {
        return this.operateWith(matrix, this._divide );
    }

    randomize(min = -1 , max = 1)
    {
        for(let rows of this.data)
        {
            for(let element in rows)
            {
                rows[element] = random(min,max);
            }
        }
        return this;
    }

    dot(matrix)
    {
        if(matrix instanceof Matrix)
        {
            let rows = this.rows;
            let columns = matrix.columns;
            let newMatrix = new Matrix(null,rows,columns,true);
            if(this.columns == matrix.rows)
            {
                let m1 = this.data;
                let m2 = matrix.data;
                for(let i = 0; i < this.rows; i++)
                {
                    for(let j = 0; j < matrix.columns; j++)
                    {
                        let sum = 0;
                        for(let k = 0; k < matrix.rows; k++)
                        {
                            sum += this._multiply(m1[i][k],m2[k][j]);
                        }
                        newMatrix.data[i][j] = sum;
                    }
                }
                return newMatrix;
            }
            return this;
        }
        return this;
    }

    transpose()
    {
        let newMatrix = new Matrix(null,this.columns,this.rows,true)
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < this.columns; j++)
            {
                newMatrix.data[j][i] = this.data[i][j];
            }
        }
        return newMatrix;
    }

    flatMap(map)
    {
        let arr = [];
        for(let rows of this.data)
        {
            for(let element of rows)
            {
                if(map)
                {
                    arr.push(map(element));
                }
                else
                {
                    arr.push(element);
                }
            }
        }
        return arr;
    }

    flatten()
    {
        let arr = [];
        for(let rows of this.data)
        {
            for(let element of rows)
            {
                arr.push(element);
            }
        }
        return arr;
    }

    transform(operation)
    {
        let column = 0;
        for(let row of this.data)
        {
            if( Array.isArray(row) )
            {
                for(let element in row)
                {
                    row[element] = operation(row[element]);
                }
            }
            else if(typeof row == "number" || row instanceof Construct)
            {
                this.data[row] = operation(this.data[row]);
            }
            column++;
        }
        return this;
    }

    map(operation)
    {
        let newMatrix = new Matrix(null,this.rows,this.columns,true);
        let column = 0;
        for(let row of newMatrix.data)
        {
            if( Array.isArray(row) )
            {
                for(let element in row)
                {
                    row[element] = operation(row[element]);
                }
            }
            else if(typeof row == "number" || row instanceof Construct)
            {
                newMatrix[row] = operation(this.data[row]);
            }
            column++;
        }
        return newMatrix;
    }

    row(index,operation)
    {
        let row = this.data[index - 1];
        if(typeof row == "number")
        {
            this.data[row] = operation(row);
        }
        else if( Array.isArray(row) )
        {
            for(let element in row)
            {
                row[element] = operation(row[element]);
            }
        }
        return this;
    }

    column(index,operation)
    {
        for(let row in this.data)
        {
            if(typeof row == "number" || row instanceof Construct)
            {
                this.data[row] = operation(row);
            }
            else if( Array.isArray(row) )
            {
                row[index] = operation(row[index]);
            }
        }
        return this;
    }

    diagonal(type,operation)
    {
        if(type == 1)
        {
            let diagonal = 0;
            for(let row of this.data)
            {
                row[diagonal] = operation(row[diagonal]);
                diagonal++;
            }
        }
        else if(type == 2)
        {
            let diagonal = this.data.length;
            for(let row of this.data.map(e => e).reverse())
            {
                row[diagonal] = operation(row[diagonal]);
                diagonal--;
            }
        }
        return this;
    }

    clone()
    {
        let newMatrix = [];
        for(let row of this.data)
        {
            if(typeof row == "number" || row instanceof Construct)
            {
                newMatrix.push(row);
            }
            else if(Array.isArray(row))
            {
                let newRow = [];
                for(let e of row)
                {
                    newRow.push(e);
                }
                newMatrix.push(newRow);
            }
        }
        return new Matrix(newMatrix);
    }

    minor(i,j)
    {
        const temp =  Matrix.of(this.rows-1,this.columns-1);
        let rt = 1;
        let ct = 1;
        for(let rows = 1; rows <= this.rows; rows++)
        {
            if(rows == i) continue;
            for(let columns = 1; columns <= this.columns; columns++)
            {
                if(columns == j) continue;
                temp.to(rt,ct++,this.at(rows,columns));
            }
            rt++;
            ct = 1;
        }
        return temp;
    }

    cofactor(i,j)
    {
        return ( (-1) ** (i+j) ) * this.at(i,j);
    }

    cofactorSign(i,j)
    {
        return ( (-1) ** (i+j) );
    }

    determinant()
    {
        if(this.rows == 1 && this.columns == 1) return this.at(1,1);
        let sum = 0;
        for(let column = 1;column <= this.data[0].length; column++)
        {
            let i = this.cofactor(1,column) * this.minor(1,column).determinant();
            sum += i;
        }
        return sum;
    }

    inverse()
    {
        let det = this.determinant();
        if(det == 0) throw Error("Only Non-Singular Matrices have inverse");
        let CofM = Matrix.of(this.rows,this.columns);
        for(let rows = 1; rows <= this.rows;rows++)
        {
            for(let columns = 1;columns<=this.columns;columns++)
            {
                let e = this.cofactorSign(rows,columns) * this.minor(rows,columns).determinant();
                CofM.to(rows,columns,e);
            }
        }
        let AdjM = CofM.transpose();
        return AdjM.divide(det);
    }

    inverse2()
    {
        let det = this.determinant();
        if(det == 0) throw Error("Only Non-Singular Matrices have inverse");
        let CofM = Matrix.of(this.rows,this.columns);
        for(let rows = 1; rows <= this.rows;rows++)
        {
            for(let columns = 1;columns<=this.columns;columns++)
            {
                let e = this.cofactorSign(rows,columns) * this.minor(rows,columns).determinant();
                CofM.to(rows,columns,e);
            }
        }
        let AdjM = CofM.transpose();
        AdjM.transform((v) => new Fraction(v,det));
        return AdjM;
    }

    toString()
    {
        let str = "";
        str += "[\n";
        for(let i = 0; i < this.rows;i++)
        {
            str += " "
            for(let j = 0; j < this.columns;j++)
            {
                let v = this.data[i][j];
                if(v == undefined && this.rows == 1) v = this.data[j] 
                if(v instanceof Construct) str += v.toString();
                else str += v;
                str += " "
            }
            str += "\n";
        }
        str += "]";
        return str;
    }

    operateWith(matrix,operation)
    {
        let newMatrix = [];
        if(typeof matrix == "number" || (matrix instanceof Construct && !(matrix instanceof Matrix)))
        {
            for(let row of this.data)
            {
                let newRow = [];
                if(Array.isArray(row))
                {
                    for(let column of row)
                    {
                        newRow.push(operation(column,matrix));
                    }
                }
                else
                {
                    newRow.push(operation(row,matrix));
                }
                newMatrix.push(newRow);
            }

        }
        else if(matrix instanceof Matrix)
        {
            for(let row in this.data)
            {
                let r1 = this.data[row];
                let r2 = matrix.data[row];
                let newRow = [];
                if((typeof r1 == "number" || r1 instanceof Construct) && (typeof r2 == "number" || r1 instanceof Construct))
                {
                    newMatrix.push(operation(r1,r2))
                }
                else if( Array.isArray(r1) && (typeof r2 == "number" || r2 instanceof Construct))
                {
                    newRow[0] = operation(r1[0],r2);
                    for(let i = 1; i < r1.length; i++)
                    {
                        newRow[i] = operation(r1[i],r2);
                    }
                    newMatrix.push(newRow);
                }
                else if( (typeof r1 == "number" || r1 instanceof Construct) && Array.isArray(r2) )
                {
                    // newMatrix.push(operation(r1,r2[0]));
                    newRow[0] = operation(r1,r2[0]);
                    for(let i = 1; i < r1.length; i++)
                    {
                        newRow[i] = operation(r1,r2[i]);
                    }
                    newMatrix.push(newRow);
                }
                else if( Array.isArray(r1) && Array.isArray(r2) )
                {
                    for(let n in r1)
                    {
                        let e1 = r1[n];
                        let e2 = r2[n];
                        if( e1 == undefined && e2 != undefined )
                        {
                            newRow.push(e2);
                        }
                        else if( e2 == undefined && e1 != undefined )
                        {
                            newRow.push(e1);
                        }
                        else
                        {
                            newRow.push(operation(r1[n],r2[n]));
                        }
                    }
                    newMatrix.push(newRow);
                }
            }
        }
        return new Matrix(newMatrix);
    }
}


function Vector(array)
{
    return new Matrix(array);
}

function ColVector(array)
{
    let output = [];
    for(let i of array)
    {
        output.push([i]);
    }
    return new Matrix(output);
}

function coerce(x,y)
{
    if(typeof(x) == "number" && typeof(y) == "number")
    {
        return {
            x:new Num(x),
            y:new Num(y)
        }
    }
    else if(typeof(x) == "number" && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
    else if(typeof(x) == "number" && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        };
    }
    else if(typeof(x) == "number" && y instanceof Fraction)
    {
        return {
            x:new Fraction(x),
            y:y
        };
    }
    else if(typeof(y) == "number" && x instanceof Matrix)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(typeof(y) == "number" && x instanceof Complex)
    {
        return {
            x:x,
            y:new Complex(y,0)
        };
    }
    else if(typeof(y) == "number" && x instanceof Fraction)
    {
        return {
            x:x,
            y:new Fraction(y)
        };
    }
    else if(x instanceof Fraction && y instanceof Fraction)
    {
        return {
            x:x,
            y:y
        };
    }
    else if(x instanceof Complex && y instanceof Complex)
    {
        return {
            x:x,
            y:y
        };
    }
    else if(x instanceof Matrix && y instanceof Matrix)
    {
        return {
            x:x,
            y:y
        };
    }
    else if(x instanceof Matrix && y instanceof Fraction)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(x instanceof Fraction && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
    else if(x instanceof Complex && y instanceof Fraction)
    {
        return {
            x:x,
            y:new Complex(y,0)
        };
    }
    else if(x instanceof Fraction && y instanceof Complex)
    {
        return {
            x:new Complex(x,0),
            y:y
        };
    }
    else if(x instanceof Matrix && y instanceof Complex)
    {
        return {
            x:x,
            y:Matrix.of(x.rows,x.columns).fill(y)
        };
    }
    else if(x instanceof Complex && y instanceof Matrix)
    {
        return {
            x:Matrix.of(y.rows,y.columns).fill(x),
            y:y
        };
    }
}

// let f1 = new Fraction(new Complex(5,1),10);
// console.log(f1.toString());
// let f2 = f1.add(10);
// console.log(f2.toString());

// const c1 = new Complex(new Fraction(2,4),1);
// console.log(c1);
// console.log(c1.toString());

// const sc1 = c1.substract(new Fraction(1,2));
// console.log(sc1);
// console.log(sc1.toString());

// const m1 = Matrix.from([new Fraction(2,4),new Fraction(2,4)]);
// console.log(m1);
// console.log(m1.toString());
// const sm1 = m1.substract(new Fraction(1,2));
// console.log(sm1);
// console.log(sm1.toString());

// const next = new Complex(1,4).add(new Fraction(1,3));
// console.log(next);
// console.log(next.toString());

// const next2 = new Complex(1,4).add(Matrix.from([ [1,2] , [3,4] ]));
// console.log(next2);
// console.log(next2.toString());

// const next3 = Matrix.from([ [new Fraction(3,4),new Fraction(5,6)] , [new Fraction(8,7),new Fraction(2,3)] ]);
// console.log(next3);
// console.log(next3.toString());

// Exports ---------------------------------------------------------------------

// Construct Protocol
module.exports.Construct = Construct;

// Fraction
module.exports.Fraction = Fraction;

// Complex
module.exports.Complex = Complex;

// Matrix
module.exports.Matrix = Matrix;
module.exports.of = Matrix.of;
module.exports.random = Matrix.random;
module.exports.from = Matrix.from;

// Vectors
module.exports.Vector = Vector;
module.exports.ColVector = ColVector;

// Utility Functions
module.exports.gcd = gcd;
module.exports.lcm = lcm;
module.exports.decToInt = decToInt;
module.exports.digits = digits;
module.exports.digitsAfterDot = digitsAfterDot;
module.exports.recurringToFraction = recurringToFraction;

module.exports.random = random;
module.exports.of = Matrix.of;
module.exports.from = Matrix.from;
module.exports.randomMatrix = Matrix.random;